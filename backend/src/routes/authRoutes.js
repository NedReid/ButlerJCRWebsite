import argon2 from "argon2";
import express from "express";
import { sendVerificationMail } from '../helpers/emailer.js';
export const authRoutes = (app, auth, db) => {

    app.post("/api/register", async function(req, res) {
        console.log("adding account");
        const hash = await argon2.hash(req.body.password, {hashLength: 64});
        try {
            const count = await db.users.countAsync({ username:req.body.username});
            if (count === 0) {
                const newUser = await db.users.insertAsync({username:req.body.username, password: hash, registered: auth.vToken({username:req.body.username})});
                console.log("added");
                await sendVerificationMail(newUser.username, newUser.registered);
                res.status(201);
                const token = auth.generateToken(newUser);
                res.cookie('loginToken', token,{httpOnly: true});
                res.send(newUser.username);
            }
            else {
                res.status(202);
                res.send();
            }
        }
        catch {
            res.status(204);
            res.send();
        }
    });

    app.post("/api/login", async function(req, res) {
        console.log("logging in");
        try {
                const foundUser = await db.users.findOneAsync({username: req.body.username});
                let ps = await argon2.verify(foundUser.password, req.body.password);
                if (ps) {
                    console.log("successful login")
                    console.log(foundUser)
                    res.status(201);
                    const token = auth.generateToken(foundUser);
                    res.cookie('loginToken', token,{httpOnly: true});
                    res.send(foundUser.username);
                }
                else {
                    console.log("wrong password")
                    res.status(204);
                    res.send();
                }
        }
        catch {
            console.log("failed login")

            res.status(204);
            res.send();
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
                admin: false
            }
            if (user !== null) {
                resp.username = webToken.username;
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

    app.get("/api/verifyLogin/:vKey", async function(req, res) {
        console.log("trying")
        console.log(req.params.vKey);
        const user = await db.users.findOneAsync({registered: req.params.vKey});
        user.registered = true;
        await db.users.updateAsync({_id:user._id}, user);
        res.status(201);
        res.send();
        try {


        }
        catch {
            res.status(204);
            res.send();
        }
    });
}

