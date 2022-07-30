import argon2 from "argon2";
import express from "express";
import * as fs from 'fs';
import * as path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";
import {parseRichText, retrieveRichText} from "../helpers/mediaHelper.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

export const democracyRoutes = async (app, auth, db) => {


    app.get("/api/democracy/getRoleHeaders", async function(req, res) {
        let roles = await db.roles.findAsync({});
        roles = await Promise.all(await roles.map(async (role) => {
            role.page = "beans";
            return role
        }));
        res.status(200);
        res.send(roles);
    });

    app.get("/api/democracy/getRole", async function(req, res) {
        console.log(req.query)
        let role = await db.roles.findOneAsync({_id: req.query._id});
        console.log(role)
        role.page = await retrieveRichText(role.page, "roles");
        res.status(200);
        res.send(role);
    });

    app.get("/api/democracy/getRoleBySlug", async function(req, res) {
        console.log(req.query)
        let role = await db.roles.findOneAsync({slug: req.query.slug});
        console.log(role)
        role.page = await retrieveRichText(role.page, "roles");
        res.status(200);
        res.send(role);
    });

    app.post("/api/democracy/updateRole", async function(req, res) {
        const webToken = auth.checkToken(req.cookies['loginToken']);
        let role = await db.roles.findOneAsync({_id: req.body._id});
        if(role.editors.includes(webToken.username)) {
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

}

