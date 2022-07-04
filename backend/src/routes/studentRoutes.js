import argon2 from "argon2";
import express from "express";
import { sendVerificationMail } from '../helpers/emailer.js';
import {parseRichText, retrieveRichText} from "../helpers/mediaHelper.js";

export const studentRoutes = async (app, auth, db) => {


    app.use("/api/students", async function(req, res, next) {
        const webToken = auth.checkToken(req.cookies['loginToken']);
        const foundUser = await db.users.findOneAsync({username: webToken.username});
        // console.log(foundUser);
        if (foundUser !== null && foundUser.registered) {
            console.log("notNull");
            next();
        }
        else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/students/getEvents", async function(req, res) {
            let events = await db.events.getAllData();
            events = events.filter(ev => ev.visible);
            events = await Promise.all(await events.map(async (ev) => {
                // console.log(ev.desc);
                console.log("beans")
                if (typeof ev.desc === 'string' || ev.desc instanceof String) {
                    console.log("ontoast")
                    ev.desc = await retrieveRichText(ev.desc, "events");
                }
                // console.log(ev);
                return ev
            }));
            // console.log(events)
            res.status(200);
            res.send(events);
    });

}

