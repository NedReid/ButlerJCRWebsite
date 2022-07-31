import argon2 from "argon2";
import express from "express";
import { sendVerificationMail } from '../helpers/emailer.js';

import {parseRichText, retrieveRichText} from "../helpers/mediaHelper.js";

export const adminRoutes = async (app, auth, db) => {

    if (await db.admins.findOneAsync({username: process.env.ADMIN_USER}) === null) {
        await db.admins.insertAsync({
            username: process.env.ADMIN_USER,
            events: true,
            finance: true,
            SSCs: true,
            adminPerms: true,
            pagePerms: true,
            democracy: true
        });
    }

    app.use("/api/admin", async function (req, res, next) {
        const webToken = auth.checkToken(req.cookies['loginToken']);
        const foundUser = await db.admins.findOneAsync({username: webToken.username});
        // console.log(foundUser);
        if (foundUser !== null) {
            console.log("notNull");
            res.locals.adminUser = foundUser;
            next();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.use("/api/admin/beansOnToast", async function (req, res) {
        res.status("418");
        res.send("TEAPOT DETECTED");
    });

    app.get("/api/admin/break", async function(req, res) {
        throw "We live in a society"
    });

    app.post("/api/admin/createEvent", async function (req, res) {
        if (res.locals.adminUser.events === true) {
            const desc = req.body.desc
            req.body.desc = "placeholder"
            let newEvent = await db.events.insertAsync(req.body);
            newEvent.desc = await parseRichText(desc, newEvent._id, "events");
            await db.events.updateAsync({_id: newEvent._id}, newEvent);
            res.status(201);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/updateEvent", async function (req, res) {
        if (res.locals.adminUser.events === true) {
            // console.log(req.body);
            req.body.desc = await parseRichText(req.body.desc, req.body._id, "events");
            await db.events.updateAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/admin/getEvents", async function (req, res) {
        if (res.locals.adminUser.events === true) {
            let events = await db.events.findAsync({});
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
        } else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/admin/getSSCs", async function (req, res) {
        if (res.locals.adminUser.SSCs === true) {
            let SSCs = await db.SSCs.findAsync({});
            res.status(200);
            res.send(SSCs);
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/createSSC", async function (req, res) {
        if (res.locals.adminUser.SSCs === true) {
            await db.SSCs.insertAsync(req.body);
            res.status(201);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/updateSSC", async function (req, res) {
        if (res.locals.adminUser.SSCs === true) {
            await db.SSCs.updateAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/deleteSSC", async function (req, res) {
        if (res.locals.adminUser.SSCs === true) {
            await db.SSCs.removeAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/createPagePerms", async function (req, res) {
        if (res.locals.adminUser.pagePerms === true) {
            await db.pagePerms.insertAsync(req.body);
            res.status(201);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/updatePagePerms", async function (req, res) {
        if (res.locals.adminUser.pagePerms === true) {
            await db.pagePerms.updateAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/admin/getPagePerms", async function (req, res) {
        if (res.locals.adminUser.pagePerms === true) {
            let pagePerms = await db.pagePerms.findAsync({});
            res.status(200);
            res.send(pagePerms);
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/deleteAdminPerms", async function (req, res) {
        if (res.locals.adminUser.adminPerms === true) {
            await db.admins.removeAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/createAdminPerms", async function (req, res) {
        if (res.locals.adminUser.adminPerms === true) {
            await db.admins.insertAsync(req.body);
            res.status(201);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/updateAdminPerms", async function (req, res) {
        if (res.locals.adminUser.adminPerms === true) {
            await db.admins.updateAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/admin/getAdminPerms", async function (req, res) {
        if (res.locals.adminUser.adminPerms === true) {
            let admins = await db.admins.findAsync({});
            res.status(200);
            res.send(admins);
        } else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/admin/getRoles", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            let roles = await db.roles.findAsync({});
            res.status(200);
            res.send(roles);
        } else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/admin/getRoleHeaders", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            let roles = await db.roles.findAsync({});
            roles = await Promise.all(await roles.map(async (role) => {
                role.page = "beans";
                role.so = "beans"
                return role
            }));
            res.status(200);
            res.send(roles);
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/createRole", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            await db.roles.insertAsync(req.body);
            res.status(201);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/updateRole", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            await db.roles.updateAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/deleteRole", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            await db.roles.removeAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/admin/getOfficers", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            let officers = await db.officers.findAsync({});
            res.status(200);
            res.send(officers);
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/createOfficer", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            await db.officers.insertAsync(req.body);
            res.status(201);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/updateOfficer", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            await db.officers.updateAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/deleteOfficer", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            await db.officers.removeAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/admin/getMeetings", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            let meetings = await db.meetings.findAsync({});
            meetings = await Promise.all(await meetings.map(async (meeting) => {
                if (typeof meeting.page === 'string' || meeting.page instanceof String) {
                    meeting.page = await retrieveRichText(meeting.page, "meetings");
                }
                return meeting
            }));
            res.status(200);
            res.send(meetings);
        } else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/admin/getMeetingHeaders", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            let meetings = await db.meetings.findAsync({});
            meetings = await Promise.all(await meetings.map(async (meeting) => {
                meeting.page = "beans";
                return meeting
            }));
            res.status(200);
            res.send(meetings);
        } else {
            res.status(401);
            res.send();
        }
    });
    
    app.post("/api/admin/createMeeting", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            req.body.page = await parseRichText(req.body.page, req.body._id, "meeting");
            await db.meetings.insertAsync(req.body);
            res.status(201);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/updateMeeting", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            req.body.page = await parseRichText(req.body.page, req.body._id, "meeting");
            await db.meetings.updateAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/deleteMeeting", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            await db.meetings.removeAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });
    app.get("/api/admin/getMotions", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            let motions = await db.motions.findAsync({});
            motions = await Promise.all(await motions.map(async (motion) => {
                if (typeof motion.notes === 'string' || motion.notes instanceof String) {
                    motion.notes = await retrieveRichText(motion.notes, "motions_notes");
                }
                if (typeof motion.believes === 'string' || motion.believes instanceof String) {
                    motion.believes = await retrieveRichText(motion.believes, "motions_believes");
                }
                if (typeof motion.resolves === 'string' || motion.resolves instanceof String) {
                    motion.resolves = await retrieveRichText(motion.resolves, "motions_resolves");
                }
                return meeting
            }));
            res.status(200);
            res.send(motions);
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/createMotion", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            req.body.notes = await parseRichText(req.body.page, req.body._id, "motion_notes");
            req.body.believes = await parseRichText(req.body.page, req.body._id, "motion_believes");
            req.body.resolves = await parseRichText(req.body.page, req.body._id, "motion_resolves");
            await db.motions.insertAsync(req.body);
            res.status(201);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/updateMotion", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            req.body.notes = await parseRichText(req.body.page, req.body._id, "motion_notes");
            req.body.believes = await parseRichText(req.body.page, req.body._id, "motion_believes");
            req.body.resolves = await parseRichText(req.body.page, req.body._id, "motion_resolves");
            await db.motions.updateAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/deleteMotion", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            await db.motions.removeAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/admin/getCandidates", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            let candidates = await db.candidates.findAsync({});
            candidates = await Promise.all(await candidates.map(async (candidate) => {
                if (typeof candidate.manifesto === 'string' || candidate.manifesto instanceof String) {
                    candidate.manifesto = await retrieveRichText(candidate.manifesto, "candidates");
                }
                return candidate
            }));
            res.status(200);
            res.send(candidates);
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/createCandidate", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            req.body.manifesto = await parseRichText(req.body.manifesto, req.body._id, "candidates");
            await db.candidates.insertAsync(req.body);
            res.status(201);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/updateCandidate", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            req.body.manifesto = await parseRichText(req.body.manifesto, req.body._id, "candidates");
            await db.candidates.updateAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/deleteCandidate", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            await db.candidates.removeAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });
}