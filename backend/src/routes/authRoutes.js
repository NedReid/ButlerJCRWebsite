import argon2 from "argon2";
import express from "express";
import { sendVerificationMail, sendPasswordResetEmail } from '../helpers/emailer.js';

const cookieLen = 1000 * 60 * 60 * 24 * 7
export const authRoutes = (app, auth, db) => {

    app.post("/api/register", async function(req, res) {
        console.log("adding account");
        req.body.username = req.body.username.toLowerCase();
        if (!(/^[A-Z]{4}[0-9]{2}$/i).test(req.body.username)) {
            res.status(200);
            res.send("Your username should be your CIS code (eg: abcd12)");
            return;
        }
        else if (req.body.password.length < 8) {
            res.status(200);
            res.send("Password should be at least 8 characters");
            return;
        }

        const hash = await argon2.hash(req.body.password, {hashLength: 64});
        try {
            const count = await db.users.countAsync({ username:req.body.username});
            if (count === 0) {
                const newUser = await db.users.insertAsync({username:req.body.username, password: hash, registered: auth.vToken({username:req.body.username})});
                console.log("added");
                await sendVerificationMail(newUser.username, newUser.registered);
                res.status(201);
                const token = auth.generateToken(newUser);
                res.cookie('loginToken', token,{maxAge: cookieLen, httpOnly: true});
                res.send(newUser.username);
            }
            else {
                res.status(200);
                res.send("This user already has an account");
            }
        }
        catch {
            res.status(200);
            res.send("Unexpected error. Try again, or contact a webmaster.");
        }
    });

    app.post("/api/passwordResetEmail", async function(req, res) {
        req.body.username = req.body.username.toLowerCase();
        try {
            let user = await db.users.findOneAsync({ username:req.body.username});
            if (user !== null) {
                user.passwordReset = auth.rToken({username:req.body.username})
                await db.users.updateAsync({_id: user._id}, user)
                await sendPasswordResetEmail(user.username, user.passwordReset);
                res.status(200);
                res.send("Check your emails. You will receive a link to reset your password.");
            }
            else {
                res.status(200);
                res.send("This account does not exist");
            }
        }
        catch {
            res.status(200);
            res.send("Unexpected error. Try again, or contact a webmaster.");
        }
    });

    app.post("/api/submitNewPassword", async function(req, res) {
        if (req.body.password.length < 8) {
            res.status(200);
            res.send("Password should be at least 8 characters");
            return;
        }
        const hash = await argon2.hash(req.body.password, {hashLength: 64});
        try {
            console.log(req.body)
            const webToken = auth.checkEToken(req.body.token);
            const user = await db.users.findOneAsync({username: webToken.username, passwordReset: req.body.token});
            if (user !== null) {
                user.passwordReset = undefined
                user.password = hash
                await db.users.updateAsync({_id: user._id}, user)
                res.status(201);
                const token = auth.generateToken(user);
                res.cookie('loginToken', token,{maxAge: cookieLen, httpOnly: true});
                res.send(user.username);

            }
            else {
                res.status(200);
                res.send("Error with reset link");
            }
        }
        catch {
            res.status(200);
            res.send("Unexpected error. Try again, or contact a webmaster.");
        }
    });


    app.post("/api/login", async function(req, res) {
        req.body.username = req.body.username.toLowerCase();
        console.log("logging in");
        try {
                const foundUser = await db.users.findOneAsync({username: req.body.username});
                if (foundUser === null) {
                    console.log("Account not found")
                    res.status(200);
                    res.send("Account not found.");
                    return
                }
                let ps = await argon2.verify(foundUser.password, req.body.password);
                if (ps) {
                    console.log("successful login")
                    console.log(foundUser)
                    res.status(201);
                    const token = auth.generateToken(foundUser);
                    res.cookie('loginToken', token,{maxAge: cookieLen, httpOnly: true});
                    res.send(foundUser.username);
                }
                else {
                    console.log("wrong password")
                    res.status(200);
                    res.send("Password is incorrect");
                }
        }
        catch {
            console.log("failed login")

            res.status(200);
            res.send("Unexpected error. Try again, or contact a webmaster.");
        }
    });

    app.get("/api/isLoggedIn", async function(req, res) {
        console.log("checking");
        try {
            res.status(201);
            const webToken = auth.checkToken(req.cookies['loginToken']);
            const user = await db.users.findOneAsync({username: webToken.username});
            const admin = await db.admins.findOneAsync({username: webToken.username});
            let resp = {
                username: false,
                verified: false,
                admin: false
            }
            if (user !== null) {
                resp.username = webToken.username;
                resp.verified = (user.registered === true);
            }
            if (admin !== null)
            {
                resp.admin = admin;
            }
            console.log(resp);
            res.send(resp);
        }
        catch {
            res.status(204);
            res.send();
        }
    });

    app.get("/api/getUserByResetToken", async function(req, res) {
        console.log("checking");
        try {
            res.status(201);
            const webToken = auth.checkEToken(req.query.resetToken);
            console.log(webToken)
            const user = await db.users.findOneAsync({username: webToken.username, passwordReset: req.query.resetToken});
            let resp = {
                username: false,
            }
            if (user !== null) {
                resp.username = webToken.username;
            }
            res.send(resp);
        }
        catch {
            res.status(204);
            res.send();
        }
    });


    app.get("/api/logout", function(req, res) {
        try {
            res.status(201);
            res.clearCookie('loginToken')
            res.send();

        }
        catch {
            res.status(204);
            res.send();
        }
    });

    app.get("/api/resendVerificationEmail", async function(req, res) {
        try {
            res.status(201);
            const webToken = auth.checkToken(req.cookies['loginToken']);
            const user = await db.users.findOneAsync({username: webToken.username});
            let resp = {
                username: false,
                verified: false,
            }
            if (user === null) { throw "no user"; }
            resp.username = webToken.username;
            resp.verified = user.registered;
            if (resp.verified === true) { throw "already verified lol" }
            await sendVerificationMail(resp.username, resp.verified);
            console.log(resp);
            res.send(resp);
        }
        catch (e) {
            console.log(e)
            res.status(204);
            res.send();
        }
    });

    app.get("/api/verifyLogin/:vKey", async function(req, res) {
        console.log("trying")
        console.log(req.params.vKey);
        const user = await db.users.findOneAsync({registered: req.params.vKey});
        user.registered = true;
        await db.users.updateAsync({_id:user._id}, user);
        res.status(201);
        res.redirect("/")
        res.send();
        try {

        }
        catch {
            res.status(204);
            res.send();
        }
    });
}

