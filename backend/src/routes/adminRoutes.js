import argon2 from "argon2";
import express from "express";
import { sendVerificationMail } from '../helpers/emailer.js';
import {
    parseRichText,
    retrieveRichText,
    retrieveImageFile,
    exportImageFile,
    saveAlbumImage, makePreviewImage, deleteDatabaseImages, renameImageFolder
} from "../helpers/mediaHelper.js";
import xl from 'excel4node';
import fs from "fs";

export const adminRoutes = async (app, auth, db, __dirname) => {

    if (await db.admins.findOneAsync({username: process.env.ADMIN_USER}) === null) {
        await db.admins.insertAsync({
            username: process.env.ADMIN_USER,
            events: true,
            finance: true,
            SSCs: true,
            adminPerms: true,
            pagePerms: true,
            democracy: true,
            postCategories: true,
            photos: true,
            freshers: true
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
            let ssc = await db.SSCs.insertAsync(req.body)
            const id = ssc._id
            ssc.slug = ssc._id
            await db.SSCs.updateAsync({_id: id}, ssc)
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
            deleteDatabaseImages(req.body._id, "SSCs")
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
            deleteDatabaseImages(req.body._id, "roles")
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
            deleteDatabaseImages(req.body._id, "officers")
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
            const page = req.body.page
            req.body.page = ""
            const newDb = await db.meetings.insertAsync(req.body);
            newDb.page = await parseRichText(page, newDb._id, "meeting");
            await db.meetings.updateAsync({_id: newDb._id}, newDb);
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
            deleteDatabaseImages(req.body._id, "meetings")
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
                return motion
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
            const notes =req.body.notes;
            const believes =req.body.believes;
            const resolves =req.body.resolves
            const newDb = await db.motions.insertAsync(req.body);
            newDb.notes = await parseRichText(notes, newDb._id, "motion_notes");;
            newDb.believes = await parseRichText(believes, newDb._id, "motion_believes");
            newDb.resolves = await parseRichText(resolves, newDb._id, "motion_resolves");
            await db.motions.updateAsync({_id: newDb}, newDb);
            res.status(201);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/updateMotion", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            req.body.notes = await parseRichText(req.body.notes, req.body._id, "motion_notes");
            req.body.believes = await parseRichText(req.body.believes, req.body._id, "motion_believes");
            req.body.resolves = await parseRichText(req.body.resolves, req.body._id, "motion_resolves");
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
            deleteDatabaseImages(req.body._id, "motions")
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
                candidate.poster = await retrieveImageFile(candidate.poster);
                candidate.promotionalImage = await retrieveImageFile(candidate.promotionalImage);
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
            const manifesto = req.body.manifesto
            const poster = req.body.poster
            const promotionalImage = req.body.promotionalImage;
            req.body.poster = "";
            req.body.promotionalImage = "";
            req.body.manifesto = "";
            const newDb = await db.candidates.insertAsync(req.body);
            newDb.poster = await exportImageFile(poster,true,  "poster", newDb._id,"candidates");
            newDb.promotionalImage =  await exportImageFile(promotionalImage,true,  "promotionalImage", newDb._id,"candidates");
            newDb.manifesto = await parseRichText(manifesto, newDb._id, "candidates");
            await db.candidates.updateAsync({_id: newDb._id}, newDb);

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
            req.body.poster = await exportImageFile(req.body.poster,true,  "poster", req.body._id,"candidates");
            req.body.promotionalImage =  await exportImageFile(req.body.promotionalImage,true,  "promotionalImage", req.body._id, "candidates");

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
            deleteDatabaseImages(req.body._id, "candidates")
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/admin/getPostCategories", async function (req, res) {
        if (res.locals.adminUser.postCategories === true) {
            let SSCs = await db.postCategories.findAsync({});
            res.status(200);
            res.send(SSCs);
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/createPostCategory", async function (req, res) {
        if (res.locals.adminUser.postCategories === true) {
            await db.postCategories.insertAsync(req.body);
            res.status(201);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/updatePostCategory", async function (req, res) {
        if (res.locals.adminUser.postCategories === true) {
            await db.postCategories.updateAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/deletePostCategory", async function (req, res) {
        if (res.locals.adminUser.postCategories === true) {
            await db.postCategories.removeAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/createProduct", async function (req, res) {
        if (res.locals.adminUser.finance === true) {
            await db.products.insertAsync(req.body);
            res.status(201);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/updateProduct", async function (req, res) {
        if (res.locals.adminUser.finance === true) {
            await db.products.updateAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/deleteProduct", async function (req, res) {
        if (res.locals.adminUser.finance === true) {
            await db.products.removeAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/admin/getProducts", async function (req, res) {
        if (res.locals.adminUser.finance === true) {
            let products = await db.products.findAsync({});
            res.status(200);
            res.send(products);
        } else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/admin/getMembersExcel", async function (req, res) {
        if (res.locals.adminUser.finance === true) {
            let wb = new xl.Workbook();
            let ws = wb.addWorksheet('members');
            let members = await db.members.findAsync({});
            ws.cell(1,1).string("Username");
            ws.cell(1,2).string("Expiry Year");
            ws.cell(1,3).string("Transaction");
            members.forEach((member, index) => {
                ws.cell(index + 2, 1).string(member.username);
                ws.cell(index + 2, 2).number(new Date(member.expiry).getFullYear() - 2000);
                ws.cell(index + 2, 3).string(member.transaction);

            })
            await wb.write("files/members.xlsx")
            res.status(200);
            res.download(__dirname + "/../files/members.xlsx","members.xlsx", (err) => {
                if (err) console.log(err);
            });
            console.log("done")
        } else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/admin/getMembers", async function (req, res) {
        if (res.locals.adminUser.finance === true) {
            let members = await db.members.findAsync({});
            res.status(200);
            res.send(members);
        } else {
            res.status(401);
            res.send();
        }
    });


    app.post("/api/admin/addMemberList", async function (req, res) {
        if (res.locals.adminUser.finance === true) {
            console.log(req.body)
            let memberList = req.body.memberList.split("\n")
            let membersToAdd = []
            memberList.forEach((member) => {
                member = member.trim();
                member = member.toLowerCase();
                const re = /^[a-z][a-z][a-z][a-z][0-9][0-9]$/gm;
                if(re.test(member)) {
                    membersToAdd.push(member);
                }

            });
            if (req.body.remove) {
                for (const member of membersToAdd) {
                    await db.members.removeAsync({username: member})
                }
            } else {
                let expiry = new Date(req.body.expiryYear,8,1)
                for (const member of membersToAdd) {
                    await db.members.insertAsync({username: member, expiry: expiry.getTime(), transaction: "added manually by " + res.locals.adminUser.username})
                }
            }

            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/deleteMember", async function (req, res) {
        if (res.locals.adminUser.finance === true) {
            let member = req.body;
            await db.members.removeAsync({_id: member._id})

            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }

    });

    app.post("/api/admin/updateMember", async function (req, res) {
        if (res.locals.adminUser.finance === true) {
            let member = req.body;
            console.log(member)
            await db.members.updateAsync({_id:member._id},{username: member.username, expiry: member.expiry, transaction: member.transaction})

            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }

    });

    app.post("/api/admin/uploadAlbumPhoto", async function (req, res) {
        if (res.locals.adminUser.photos === true) {
            const imageName = req.body.imageName;
            console.log(imageName);
            const imageData = req.body.imageData
            const path = req.body.albumAddress;
            const dir = "files/albums/" + path
            const previewDir = "files/albumsPreview/" + path
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
                fs.mkdirSync(previewDir);
            }
            await saveAlbumImage(imageData, (dir + "/" + imageName))
            await makePreviewImage(dir + "/" + imageName, previewDir + "/" + imageName + ".webp")

            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }

    });

    app.get("/api/admin/getCalendarEvents", async function (req, res) {
        if (res.locals.adminUser.events === true) {
            let events = await db.calendarEvents.findAsync({});
            events = await Promise.all(await events.map(async (ev) => {
                if (typeof ev.description === 'string' || ev.description instanceof String) {
                    ev.description = await retrieveRichText(ev.description, "calendarEvents");
                }
                return ev
            }));
            res.status(200);
            res.send(events);
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/createCalendarEvent", async function (req, res) {
        if (res.locals.adminUser.events === true) {
            const desc = req.body.description
            req.body.description = "placeholder"
            let newEvent = await db.calendarEvents.insertAsync(req.body);
            newEvent.description = await parseRichText(desc, newEvent._id, "calendarEvents");
            await db.calendarEvents.updateAsync({_id: newEvent._id}, newEvent);
            res.status(201);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/updateCalendarEvent", async function (req, res) {
        if (res.locals.adminUser.events === true) {
            // console.log(req.body);
            req.body.description = await parseRichText(req.body.description, req.body._id, "calendarEvents");
            await db.calendarEvents.updateAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/admin/getKeyValue", async function (req, res) {
        const kv = await db.keyValues.findOneAsync({key: req.query.key})
        if (kv === undefined || kv === null) {
            res.status(200);
            res.send(false);

        }
        else {
            res.status(200);
            res.send(kv.value);
        }
    });

    app.post("/api/admin/setKeyValue", async function (req, res) {
        const kv = await db.keyValues.findOneAsync({key: req.body.key});
        if (kv === undefined || kv === null) {
            await db.keyValues.insertAsync({key: req.body.key, value: req.body.value})
        }
        else {
            kv.value = req.body.value
            await db.keyValues.updateAsync({_id: kv._id},kv)
        }
        res.status(200);
        res.send();
    });


    app.post("/api/admin/createFAQ", async function (req, res) {
            const answer = req.body.answer
            req.body.answer = ""
            const newDb = await db.FAQ.insertAsync(req.body);
            newDb.answer = await parseRichText(answer, newDb._id, "FAQ");
            await db.FAQ.updateAsync({_id: newDb._id}, newDb);
            res.status(201);
            res.send();
    });

    app.post("/api/admin/updateFAQ", async function (req, res) {
        req.body.answer = await parseRichText(req.body.answer, req.body._id, "FAQ");
        await db.FAQ.updateAsync({_id: req.body._id}, req.body);
        res.status(200);
        res.send();

    });

    app.post("/api/admin/deleteFAQ", async function (req, res) {
        await db.FAQ.removeAsync({_id: req.body._id}, req.body);
        deleteDatabaseImages(req.body._id, "FAQ")
        res.status(200);
        res.send();

    });

    app.post("/api/admin/createDocument", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            const document = await db.documents.insertAsync(req.body.document);
            if (req.body.file !== "") {
                let dat = req.body.file.replace(/^data:application\/pdf;base64,/, "");
                let buffer = Buffer.from(dat, "base64");
                const dir = "files/documents/" + document._id;
                const path = dir + "/" + document.address;
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }
                fs.writeFileSync(path, buffer);
            }
            res.status(201);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/updateDocument", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            await db.documents.updateAsync({_id: req.body.document._id}, req.body.document);
            if (req.body.file !== "") {
                let dat = req.body.file.replace(/^data:application\/pdf;base64,/, "");
                let buffer = Buffer.from(dat, "base64");
                const dir = "files/documents/" + req.body.document._id;
                const path = dir + "/" + req.body.document.address;
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }
                fs.writeFileSync(path, buffer);
            }
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/deleteDocument", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            await db.documents.removeAsync({_id: req.body.document._id}, req.body.document);
            deleteDatabaseImages(req.body.document._id, "documents")
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/admin/getDocuments", async function (req, res) {
        if (res.locals.adminUser.democracy === true) {
            let documents = await db.documents.findAsync({});
            res.status(200);
            res.send(documents);
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/createWhosWho", async function (req, res) {
        const photo = req.body.photo
        req.body.photo = "";
        const newDb = await db.whosWho.insertAsync(req.body);
        newDb.photo = await exportImageFile(photo,true,  "photo", newDb._id,"whosWho");
        await db.whosWho.updateAsync({_id: newDb._id}, newDb);

        res.status(201);
        res.send();
    });

    app.post("/api/admin/updateWhosWho", async function (req, res) {
        req.body.photo = await exportImageFile(req.body.photo,false,  "photo", req.body._id,"whosWho");
        await db.whosWho.updateAsync({_id: req.body._id}, req.body);
        res.status(200);
        res.send();

    });

    app.post("/api/admin/deleteWhosWho", async function (req, res) {
        await db.whosWho.removeAsync({_id: req.body._id}, req.body);
        deleteDatabaseImages(req.body._id, "whosWho")
        res.status(200);
        res.send();

    });

    app.post("/api/admin/createPhotoAlbum", async function (req, res) {
        if (res.locals.adminUser.photos === true) {
            await db.photoAlbums.insertAsync(req.body);
            res.status(201);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/updatePhotoAlbum", async function (req, res) {
        if (res.locals.adminUser.photos === true) {
            const newAlbum = req.body
            const oldAlbum = await db.photoAlbums.findOneAsync({_id: req.body._id});

            if (newAlbum.name === "") {
                res.status(400);
                res.send();
                return
            }

            if (newAlbum.name !== oldAlbum.name) {
                renameImageFolder(oldAlbum.name, newAlbum.name, "albums")
                renameImageFolder(oldAlbum.name, newAlbum.name, "albumsPreview")
            }

            await db.photoAlbums.updateAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.get("/api/admin/getPhotoAlbums", async function (req, res) {
        if (res.locals.adminUser.photos === true) {
            let pagePerms = await db.photoAlbums.findAsync({});
            res.status(200);
            res.send(pagePerms);
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/admin/deletePhotoAlbum", async function (req, res) {
        if (res.locals.adminUser.photos === true) {
            const oldAlbum = await db.photoAlbums.findOneAsync({_id: req.body._id});
            deleteDatabaseImages(oldAlbum.name, "albums")
            deleteDatabaseImages(oldAlbum.name, "albumsPreview")
            await db.photoAlbums.removeAsync({_id: req.body._id}, req.body);
            res.status(200);
            res.send();
        } else {
            res.status(401);
            res.send();
        }
    });


}
