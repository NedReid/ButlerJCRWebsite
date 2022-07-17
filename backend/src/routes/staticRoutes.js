import argon2 from "argon2";
import express from "express";
import * as fs from 'fs';
import * as path from 'path';
import {dirname} from "path";
import {fileURLToPath} from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

export const staticRoutes = async (app, auth, db) => {


    app.get("/api/home/getFolderAddresses", async function(req, res) {
        let files = fs.readdirSync(path.join(__dirname, "../../" + req.query.folder))
        files = files.map (file => req.query.folder + file);
        console.log(files)
        // console.log(events)
        res.status(200);
        res.send(files);
    });



}

