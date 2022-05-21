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
            res.locals.adminUser = foundUser;
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

    app.post("/api/admin/createEvent", async function(req, res) {
        if(res.locals.adminUser.events === true) {
            await db.events.insertAsync(req.body);
            res.status(201);
            res.send();
        }
        else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/updateEvent", async function(req, res) {
        if(res.locals.adminUser.events === true) {
            await db.events.updateAsync(req.body);
            res.status(201);
            res.send();
        }
        else {
            res.status(401);
            res.send();
        }
    });

}

