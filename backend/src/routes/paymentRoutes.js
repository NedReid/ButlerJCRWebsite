import argon2 from "argon2";
import express from "express";
import { sendVerificationMail } from '../helpers/emailer.js';
import {parseRichText, retrieveImageFile, retrieveRichText} from "../helpers/mediaHelper.js";

export const paymentRoutes = async (app, auth, db, stripe) => {


    app.use("/api/payments", async function(req, res, next) {
        const webToken = auth.checkToken(req.cookies['loginToken']);
        const foundUser = await db.users.findOneAsync({username: webToken.username});
        // console.log(foundUser);
        if (foundUser !== null && foundUser.registered) {
            res.locals.user = foundUser;
            console.log("hhhh");
            next();
        }
        else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/payments/payLevy", async (req, res) => {
        // const { product } = req.body;
        console.log("Making Peement")
        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ["a"],
            line_items: [
                {
                    price_data: {
                        currency: "gbp",
                        product_data: {
                            name: "JCR Levy",
                        },
                        unit_amount: 14600,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:3001/success",
            cancel_url: "http://localhost:3001/cancel",
        });
        res.json({ id: session.id });
    });


    app.get("/api/payments/getProducts", async function (req, res) {
        let products = await db.products.findAsync({});
        res.status(200);
        res.send(products);
    });

    app.get("/api/payments/getProductByName", async function (req, res) {
        let product = await db.products.findOneAsync({name:req.query.name});
        res.status(200);
        res.send(product);
    });


}

