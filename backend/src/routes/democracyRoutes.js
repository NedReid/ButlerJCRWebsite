import argon2 from "argon2";
import express from "express";
import * as fs from 'fs';
import * as path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";
import {parseRichText, retrieveRichText} from "../helpers/mediaHelper.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

export const democracyRoutes = async (app, auth, db) => {

    const getToken = (req) => {
        if (req.cookies['loginToken'] === undefined) {
            return undefined;
        }
        return auth.checkToken(req.cookies['loginToken']);
    }

    const checkAdmin = async (req, webToken) => {
        if (webToken === undefined) {
            return false;
        }
        const foundUser = await db.admins.findOneAsync({username: webToken.username});
        // console.log(foundUser);
        if (foundUser !== null) {
            return foundUser.democracy;
        }
        return false;
    }

    const checkOfficer = async (req, webToken) => {
        if (webToken === undefined) {
            return [];
        }
        const foundOfficers = await db.officers.findAsync({username: webToken.username});
        // console.log(foundUser);
        if (foundOfficers !== null) {
            return foundOfficers.filter(officer => officer.current).map(officer => officer.role)
        }
        return []
    }

    const getOfficers = async (role) => {
        const foundOfficers = await db.officers.findAsync({role: role});
        if (foundOfficers !== null) {
            console.log(foundOfficers)
            return foundOfficers.filter(officer => officer.current)
        }
        return []
    }


    app.get("/api/democracy/getRoleHeaders", async function(req, res) {
        const webToken = getToken(req);
        let roles = await db.roles.findAsync({});
        if (!(await checkAdmin(req, webToken))) {
            const officerPerms = await checkOfficer(req, webToken)
            roles = roles.filter(role => (role.visible === true || officerPerms.includes(role._id)))
        }
        roles = await Promise.all(await roles.map(async (role) => {
            role.page = "beans";
            return role
        }));
        res.status(200);
        res.send(roles);
    });

    app.get("/api/democracy/getRole", async function(req, res) {
        const webToken = getToken(req);
        let role = await db.roles.findOneAsync({_id: req.query._id});
        let admin = await checkAdmin(req, webToken)
        if (!admin) {
            let officePerms = await checkOfficer(req, webToken)
            admin = officePerms.includes(role._id);
        }
        if (role.visible || admin) {
            role.page = await retrieveRichText(role.page, "roles");
            res.status(200);
            res.send({role: role, admin: admin});
        }
        else {
            res.status(401);
            res.send();
        }

    });

    app.get("/api/democracy/getRoleBySlug", async function(req, res) {
        const webToken = getToken(req);
        let role = await db.roles.findOneAsync({slug: req.query.slug});
        const officers = await getOfficers(role._id)
        let admin = await checkAdmin(req, webToken)
        if (!admin) {
            let officePerms = await checkOfficer(req, webToken)
            admin = officePerms.includes(role._id);
        }
        if (role.visible || admin) {
            role.page = await retrieveRichText(role.page, "roles");
            res.status(200);
            console.log(officers)
            res.send({role: role, admin: admin, officers: officers});
        }
        else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/democracy/updateRole", async function(req, res) {
        const webToken = getToken(req);
        let role = await db.roles.findOneAsync({_id: req.body._id});
        let admin = await checkAdmin(req, webToken)
        if (!admin) {
            let officePerms = await checkOfficer(req, webToken)
            admin = (officePerms.includes(role._id));
        }
        if(admin) {
            req.body.page = await parseRichText(req.body.page, req.body._id, "roles");
            if (req.body.slug === undefined || req.body.slug === "") {
                req.body.slug = req.body._id;
            }
            await db.roles.updateAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        }
        else {
            res.status(401);
            res.send();
        }
    });


    app.get("/api/democracy/getOfficerHeaders", async function(req, res) {
        let officers = await db.officers.findAsync({});
        officers = await Promise.all(await officers.map(async (officer) => {
            officer.page = "beans";
            return officer
        }));
        res.status(200);
        res.send(officers);
    });

    app.get("/api/democracy/getOfficer", async function(req, res) {
        console.log(req.query)
        let officer = await db.officers.findOneAsync({_id: req.query._id});
        console.log(officer)
        officer.page = await retrieveRichText(officer.page, "officers");
        res.status(200);
        res.send(officer);
    });

    app.post("/api/democracy/updateOfficer", async function(req, res) {
        const webToken = auth.checkToken(req.cookies['loginToken']);
        let officer = await db.officers.findOneAsync({_id: req.body._id});
        if(officer.editors.includes(webToken.username)) {
            req.body.page = await parseRichText(req.body.page, req.body._id, "officers");
            if (req.body.slug === undefined || req.body.slug === "") {
                req.body.slug = req.body._id;
            }
            await db.officers.updateAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        }
        else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/democracy/getMeetingHeaders", async function(req, res) {
        const webToken = getToken(req);
        let meetings = await db.meetings.findAsync({});
        if (!(await checkAdmin(req, webToken))) {
            meetings = meetings.filter(meeting => (meeting.visible === true))
        }
        meetings = await Promise.all(await meetings.map(async (meeting) => {
            meeting.page = "beans";
            return meeting
        }));
        res.status(200);
        res.send(meetings);
    });

    app.get("/api/democracy/getMeeting", async function(req, res) {
        const webToken = getToken(req);
        let meeting = await db.meetings.findOneAsync({_id: req.query._id});
        let admin = await checkAdmin(req, webToken)
        if (meeting.visible || admin) {
            meeting.page = await retrieveRichText(meeting.page, "meetings");
            res.status(200);
            res.send(meeting);
        }
        else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/democracy/getMotionHeaders", async function(req, res) {
        const webToken = getToken(req);
        let motions = await db.motions.findAsync({});
        if (!(await checkAdmin(req, webToken))) {
            motions = await Promise.all(await motions.filter(async (motion) => {
                let meeting = await db.meetings.findOneAsync({_id: motion.meeting})
                return meeting.visible === true
            }));
        }
        motions = await Promise.all(await motions.map(async (motion) => {
            motion.notes = "beans";
            motion.believes = "beans";
            motion.resolves = "beans";
            return motion
        }));
        res.status(200);
        res.send(motions);
    });

    app.get("/api/democracy/getMotion", async function(req, res) {
        const webToken = getToken(req);
        let motion = await db.motions.findOneAsync({_id: req.query._id});
        let meeting = await db.meetings.findOneAsync({_id: motion.meeting})
        let admin = await checkAdmin(req, webToken)
        if (meeting.visible || admin) {
            motion.notes = await retrieveRichText(motion.notes, "motions_notes");
            motion.believes = await retrieveRichText(motion.believes, "motions_believes");
            motion.resolves = await retrieveRichText(motion.resolves, "motions_resolves");
            res.status(200);
            res.send(motion);
        }
        else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/democracy/getCandidateHeaders", async function(req, res) {
        const webToken = getToken(req);
        let candidates = await db.candidates.findAsync({});
        if (!(await checkAdmin(req, webToken))) {
            candidates = await Promise.all(await candidates.filter(async (candidate) => {
                let meeting = await db.meetings.findOneAsync({_id: candidate.meeting})
                return meeting.visible === true
            }));
        }
        candidates = await Promise.all(await candidates.map(async (candidate) => {
            candidate.page = "beans";
            return candidate
        }));
        res.status(200);
        res.send(candidates);
    });

    app.get("/api/democracy/getCandidate", async function(req, res) {
        const webToken = getToken(req);
        let candidate = await db.candidates.findOneAsync({_id: req.query._id});
        let meeting = await db.meetings.findOneAsync({_id: candidate.meeting})
        let admin = await checkAdmin(req, webToken)
        if (candidate.visible || admin) {
            candidate.manifesto = await retrieveRichText(candidate.manifesto, "candidates_notes");
            res.status(200);
            res.send(candidate);
        }
        else {
            res.status(401);
            res.send();
        }
    });
}

