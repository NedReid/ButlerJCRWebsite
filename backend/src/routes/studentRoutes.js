import argon2 from "argon2";
import express from "express";
import { sendVerificationMail } from '../helpers/emailer.js';
import {parseRichText, retrieveImageFile, retrieveRichText} from "../helpers/mediaHelper.js";

export const studentRoutes = async (app, auth, db) => {


    app.use("/api/students", async function(req, res, next) {
        const webToken = auth.checkToken(req.cookies['loginToken']);
        const foundUser = await db.users.findOneAsync({username: webToken.username});
        // console.log(foundUser);
        if (foundUser !== null && foundUser.registered) {
            res.locals.user = foundUser;
            console.log("notNull");
            next();
        }
        else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/students/getEvents", async function(req, res) {
            let events = await db.events.findAsync({});
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

    app.post("/api/students/createEventBooking", async function(req, res) {
        await db.eventBooking.insertAsync(req.body);
        res.status(201);
        res.send();
    });


    app.post("/api/students/createPost", async function (req, res) {
        console.log(req.body)
        const postCategory = await db.postCategories.findOneAsync({_id: req.body.category});
        req.body.editor = res.locals.user.username;

        if (postCategory.editors.includes(res.locals.user.username) || postCategory.editors.length === 0) {
            const post = req.body.post;
            req.body.post = "";
            const newDb = await db.posts.insertAsync(req.body);
            newDb.post = await parseRichText(post, newDb._id, "posts");
            await db.posts.updateAsync({_id: newDb._id}, newDb);
            res.status(201);
            res.send();
        }
        else {
            res.status(401);
            res.send();
        }

    });

    app.post("/api/students/updatePost", async function (req, res) {
        const post = await db.posts.findOneAsync({_id: req.body._id});
        if (post.editor === res.locals.user.username) {
            const postCategory = await db.postCategories.findOneAsync({_id: req.body.category});
            if (postCategory.editors.includes(res.locals.user.username) || postCategory.editors.length === 0) {
                console.log("updating!")
                req.body.post = await parseRichText(req.body.post, req.body._id, "posts");
                await db.posts.updateAsync({_id: req.body._id}, req.body);
                res.status(200);
                res.send();
            } else {
                res.status(401);
                res.send();
            }
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/students/deletePost", async function (req, res) {
        console.log(req.body)
        const post = await db.posts.findOneAsync({_id: req.body._id});
        console.log(post)
        console.log("BEANZ", post.editor,res.locals.user.username)
        if (post.editor === res.locals.user.username) {
            await db.posts.removeAsync({_id: req.body._id}, {});
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/students/getUserPosts", async function(req, res) {
        console.log(res.locals.user.username)
        const posts = await db.posts.findAsync({editor: res.locals.user.username});
        console.log(posts)
        res.status(200);
        res.send(posts);
    });

    app.get("/api/students/getPost", async function(req, res) {
        console.log(res.locals.user.username)
        let post = await db.posts.findOneAsync({_id: req.query._id});
        console.log(post)
        post.post = await retrieveRichText(post.post, "posts");
        console.log(post)
        res.status(200);
        res.send(post);
    });


    app.get("/api/students/getPostCategories", async function(req, res) {
        const postCategories = await db.postCategories.findAsync({});
        res.status(200);
        res.send(postCategories);
    });


    app.get("/api/students/getMembershipStatus", async function(req, res) {
        const member = await db.members.findOneAsync({username:res.locals.user.username});
        res.status(200);
        if (member === null){
            res.send(false);
        } else {
            res.send(member);
        }
    });


}

