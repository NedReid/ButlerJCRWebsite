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

}

