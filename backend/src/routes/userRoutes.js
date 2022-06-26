import argon2 from "argon2";
import express from "express";
import { sendVerificationMail } from '../helpers/emailer.js';
export const userRoutes = async (app, auth, db) => {


    app.use("/api/user", async function(req, res, next) {
        const webToken = auth.checkToken(req.cookies['loginToken']);
        const foundUser = await db.users.findOneAsync({username: webToken.username});
        console.log(foundUser);
        if (foundUser !== null) {
            res.locals.user = foundUser;
            next();
        }
        else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/user/createEventBooking", async function(req, res) {
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


}

