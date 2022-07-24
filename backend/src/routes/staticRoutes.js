import argon2 from "argon2";
import express from "express";
import * as fs from 'fs';
import * as path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";
import {parseRichText, retrieveRichText} from "../helpers/mediaHelper.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

export const staticRoutes = async (app, auth, db) => {


    app.get("/api/static/getFolderAddresses", async function(req, res) {
        let files = fs.readdirSync(path.join(__dirname, "../../" + req.query.folder))
        files = files.map (file => req.query.folder + file);
        console.log(files)
        // console.log(events)
        res.status(200);
        res.send(files);
    });

    app.get("/api/static/getPageEditables", async function(req, res) {
        let editables = await db.editables.findAsync({page: req.query.page});
        let editor = false;
        try {
            const webToken = auth.checkToken(req.cookies['loginToken']);
            let pagePerms = await db.pagePerms.findOneAsync({page: req.query.page});
            editor = pagePerms.editors.includes(webToken.username)
        }
        catch {
            console.log("not signed in?")
        }



        editables = await Promise.all(await editables.map(async (ed) => {
            if (typeof ed.content === 'string' || ed.content instanceof String) {
                ed.content = await retrieveRichText(ed.content, "editables");
            }
            return ed
        }));
        // console.log(events)
        res.status(200);
        res.send({editables: editables, editor: editor});
    });

    app.post("/api/static/updatePageEditables", async function(req, res) {
        try {
            const webToken = auth.checkToken(req.cookies['loginToken']);
            let pagePerms = await db.pagePerms.findOneAsync({page: req.body.page});
            if (pagePerms.editors.includes(webToken.username)) {
                await req.body.editables.map(async (ed) => {
                    if (ed.page === req.body.page) {
                        let edEnt = await db.editables.findOneAsync({page: req.body.page, name: ed.name, _id: ed._id})
                        if (edEnt !== null) {
                            ed.content = await parseRichText(ed.content, ed._id, "editables");
                            await db.editables.updateAsync({_id: ed._id}, ed)
                        } else {
                            const content = ed.content;
                            ed.content = ""
                            let newEnt = await db.editables.insertAsync(ed);
                            ed.content = await parseRichText(content, newEnt._id, "editables");
                            await db.editables.updateAsync({_id: newEnt._id}, ed)


                        }
                    }
                });
                res.status(200);
                res.send();
            } else {
                res.status(401);
                res.send();
            }
        }
        catch {
            res.status(401);
            res.send();
        }
    });

}

