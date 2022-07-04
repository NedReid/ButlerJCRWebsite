import argon2 from "argon2";
import express from "express";
import { sendVerificationMail } from '../helpers/emailer.js';
import {parseRichText, retrieveRichText} from "../helpers/mediaHelper.js";

export const adminRoutes = async (app, auth, db) => {

    if(await db.admins.findOneAsync({username: process.env.ADMIN_USER}) === null) {
        await db.admins.insertAsync({username: process.env.ADMIN_USER, events: true, finance: true});
    }

    app.use("/api/admin", async function(req, res, next) {
        const webToken = auth.checkToken(req.cookies['loginToken']);
        const foundUser = await db.admins.findOneAsync({username: webToken.username});
        // console.log(foundUser);
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
            req.body.desc = await parseRichText(req.body.desc, req.body._id, "events");
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
            // console.log(req.body);
            req.body.desc = await parseRichText(req.body.desc, req.body._id, "events");
            await db.events.updateAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        }
        else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/admin/getEvents", async function(req, res) {
        if(res.locals.adminUser.events === true) {
            let events = await db.events.getAllData();
            events = await Promise.all(await events.map(async (ev) => {
                // console.log(ev.desc);
                console.log("beans")
                if (typeof ev.desc === 'string' || ev.desc instanceof String) {
                    console.log("ontoast");
                    ev.desc = await retrieveRichText(ev.desc, "events");

                }
                // console.log(ev);
                return ev
            }));
            // console.log(events)
            res.status(200);
            res.send(events);
        }
        else {
            res.status(401);
            res.send();
        }
    });

}

