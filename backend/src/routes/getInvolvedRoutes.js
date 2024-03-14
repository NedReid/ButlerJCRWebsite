import {parseRichText, retrieveRichText, saveLogo} from "../helpers/mediaHelper.js";

export const getInvolvedRoutes = async (app, auth, db) => {


        app.get("/api/get-involved/getSSCHeaders", async function(req, res) {

            const webToken = auth.checkToken(req.cookies['loginToken']);
            // let admin = false;
            // if (webToken !== undefined) {
            //     const foundUser = await db.admins.findOneAsync({username: webToken.username});
            //     if (foundUser !== null) {
            //         admin = foundUser.SSCs;
            //     }
            // }

            let SSCs = await db.SSCs.findAsync({});
            SSCs = await Promise.all(await SSCs.map(async (ssc) => {
                ssc.page = "beans";
                return ssc
            }));
            SSCs = SSCs.filter((ssc) => {
                return ssc.visible || (webToken !== undefined && ssc.editors.includes(webToken.username))
            })
            res.status(200);
            res.send(SSCs);
        });

        app.get("/api/get-involved/getSSC", async function(req, res) {
            console.log(req.query)
            let SSC = await db.SSCs.findOneAsync({_id: req.query._id});
            console.log(SSC)
            SSC.page = await retrieveRichText(SSC.page, "SSCs");
            res.status(200);
            res.send(SSC);
        });

        app.get("/api/get-involved/getSSCBySlug", async function(req, res) {
            console.log(req.query)
            let SSC = await db.SSCs.findOneAsync({slug: req.query.slug});
            console.log(SSC)
            SSC.page = await retrieveRichText(SSC.page, "SSCs");
            res.status(200);
            res.send(SSC);
        });

        app.post("/api/get-involved/updateSSC", async function(req, res) {
            const webToken = auth.checkToken(req.cookies['loginToken']);
            let SSC = await db.SSCs.findOneAsync({_id: req.body._id});
            if(SSC.editors.includes(webToken.username)) {
                req.body.page = await parseRichText(req.body.page, req.body._id, "SSCs");
                if (req.body.slug === undefined || req.body.slug === "") {
                    req.body.slug = req.body._id;
                }
                await db.SSCs.updateAsync({_id: req.body._id}, req.body);
                res.status(200);
                res.send();
            }
            else {
                res.status(401);
                res.send();
            }
        });

        app.post("/api/get-involved/uploadSSCLogo", async function(req, res) {
            const webToken = auth.checkToken(req.cookies['loginToken']);
            let SSC = await db.SSCs.findOneAsync({_id: req.body.id});
            if(SSC.editors.includes(webToken.username)) {
                let logo = req.body.logo
                let id = req.body.id
                let path = "files/sscLogos/" + id
                await saveLogo(logo, path)
                res.status(200);
                res.send();
            }
            else {
                res.status(401);
                res.send();
            }
        });



}

