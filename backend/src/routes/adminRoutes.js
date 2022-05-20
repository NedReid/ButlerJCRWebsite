import argon2 from "argon2";
import express from "express";
import { sendVerificationMail } from '../helpers/emailer.js';
export const adminRoutes = async (app, auth, db) => {

    if(await db.admins.findOneAsync({username: process.env.ADMIN_USER}) === null) {
        await db.admins.insertAsync({username: process.env.ADMIN_USER, events: true, finance: true});
    }

    app.use("/api/admin", async function(req, res, next) {
        const webToken = auth.checkToken(req.cookies['loginToken']);
        const foundUser = await db.admins.findOneAsync({username: webToken.username});
        console.log(foundUser);
        if (foundUser !== null) {
            console.log("notNull");
            next();
        }
        else {
            res.status(401);
            res.send();
        }
    });
    app.use("/api/admin/beansOnToast", async function(req, res) {
        res.status("418");
        res.send("TEAPOT DETECTED");
    });

    // app.post("/api/register", async function(req, res) {
    //     console.log("adding account");
    //     const hash = await argon2.hash(req.body.password, {hashLength: 64});
    //     try {
    //         const count = await db.users.countAsync({ username:req.body.username});
    //         if (count === 0) {
    //             const newUser = await db.users.insertAsync({username:req.body.username, password: hash, registered: auth.vToken({username:req.body.username})});
    //             console.log("added");
    //             await sendVerificationMail(newUser.username, newUser.registered);
    //             res.status(201);
    //             const token = auth.generateToken(newUser);
    //             res.cookie('loginToken', token,{httpOnly: true});
    //             res.send(newUser.username);
    //         }
    //         else {
    //             res.status(202);
    //             res.send();
    //         }
    //     }
    //     catch {
    //         res.status(204);
    //         res.send();
    //     }
    // });
    //
    // app.post("/api/login", async function(req, res) {
    //     console.log("logging in");
    //     try {
    //             const foundUser = await db.users.findOne({username: req.body.username});
    //             let ps = await argon2.verify(foundUser.password, req.body.password);
    //             if (ps) {
    //                 console.log("successful login")
    //                 console.log(foundUser)
    //                 res.status(201);
    //                 const token = auth.generateToken(foundUser);
    //                 res.cookie('loginToken', token,{httpOnly: true});
    //                 res.send(foundUser.username);
    //             }
    //             else {
    //                 console.log("wrong password")
    //                 res.status(204);
    //                 res.send();
    //             }
    //     }
    //     catch {
    //         console.log("failed login")
    //
    //         res.status(204);
    //         res.send();
    //     }
    // });
    //
    // app.get("/api/isLoggedIn", function(req, res) {
    //     console.log("checking");
    //     try {
    //
    //
    //         res.status(201);
    //         const webToken = auth.checkToken(req.cookies['loginToken']);
    //         res.send(webToken.username);
    //     }
    //     catch {
    //         res.status(204);
    //         res.send();
    //     }
    // });
    //
    //
    // app.get("/api/logout", function(req, res) {
    //     try {
    //         res.status(201);
    //         res.clearCookie('loginToken')
    //         res.send();
    //
    //     }
    //     catch {
    //         res.status(204);
    //         res.send();
    //     }
    // });
    //
    // app.get("/api/verifyLogin/:vKey", async function(req, res) {
    //     console.log("trying")
    //     console.log(req.params.vKey);
    //     const user = await db.users.findOneAsync({registered: req.params.vKey});
    //     user.registered = true;
    //     await db.users.updateAsync({_id:user._id}, user);
    //     res.status(201);
    //     res.send();
    //     try {
    //
    //
    //     }
    //     catch {
    //         res.status(204);
    //         res.send();
    //     }
    // });
}

