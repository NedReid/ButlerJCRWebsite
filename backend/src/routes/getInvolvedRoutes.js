import argon2 from "argon2";
import express from "express";
import { sendVerificationMail } from '../helpers/emailer.js';
import {parseRichText, retrieveRichText} from "../helpers/mediaHelper.js";

export const getInvolvedRoutes = async (app, auth, db) => {


    app.get("/api/get-involved/getSSCHeaders", async function(req, res) {
            let SSCs = await db.SSCs.getAllData();
            SSCs = await Promise.all(await SSCs.map(async (ssc) => {
                ssc.page = undefined;
                return ssc
            }));
            res.status(200);
            res.send(SSCs);
        });


}

