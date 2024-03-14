import {parseRichText, retrieveRichText} from "../helpers/mediaHelper.js";

export const democracyRoutes = async (app, auth, db) => {
    const meetingEnum = {
        mic1: 0,
        mic2: 1,
        mic3: 2,
        epi1: 3,
        epi2: 4,
        epi3: 5,
        eas1: 6,
        eas2: 7,
        emergency: 8,
        none: -1,
    }
    const slugToEnum = {
        "michaelmas-1": meetingEnum.mic1,
        "michaelmas-2": meetingEnum.mic2,
        "michaelmas-3": meetingEnum.mic3,
        "epiphany-1": meetingEnum.epi1,
        "epiphany-2": meetingEnum.epi2,
        "epiphany-3": meetingEnum.epi3,
        "easter-1": meetingEnum.eas1,
        "easter-2": meetingEnum.eas2,
        "emergency": meetingEnum.emergency,
        "meeting": meetingEnum.none,
    }

    const methodEnum = {
        m1: 0,
        m2: 1,
        m2a: 2,
        m3: 3,
    }

    const slugToMeeting = async (slug) => {
        const meetings = await db.meetings.findAsync({visible: true});
        if (slug === undefined || slug === "") {
            return meetings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
        }
        for (const [key, value] of Object.entries(slugToEnum)) {
            if (slug.startsWith(key)) {
                if (value === meetingEnum.none || value === meetingEnum.emergency) {
                    const sl = slug.split("-")
                    if (sl.length === 4) {
                        return meetings.find(meeting => {
                            const date = new Date(meeting.date);
                            return meeting.m_type === value && date.getDate().toString() === sl[1]
                                && date.getMonth().toString() === sl[2] && date.getFullYear().toString() === sl[3]
                        });
                    }
                }
                else {
                    const sl = slug.split("-")
                    if (sl.length === 3) {
                        return meetings.find(meeting => {
                            const date = new Date(meeting.date);
                            return meeting.m_type === value && date.getFullYear().toString() === sl[2]
                        });
                    }
                }
            }
        }
    }

    const getApplicableRoles = async (meeting) => {
        const roles = await db.roles.findAsync({});
        const d = new Date(meeting.date)
        const dayAfter = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
        console.log(new Date().getTime())
        console.log(dayAfter.getTime())
        if ((new Date().getTime()) > dayAfter.getTime())
        {
             // another shitty hack. returning officers rather than roles lol
            const currentOfficers = await db.officers.findAsync();
            let electedOfficers = currentOfficers.filter(officer => {
                return officer.election_meeting === meeting.m_type && officer.election_year === (new Date(meeting.date)).getFullYear();
            });
            return electedOfficers.map(officer =>{
                officer.role = roles.find(role => role._id === officer.role)
                return officer
            });
        }
        else {
            const currentOfficers = await db.officers.findAsync({current: true});
            let filteredRoles = roles.filter(role => {
                return  ((role.e_meeting === meeting.m_type) ||
                        (currentOfficers.filter(officer => officer.role === role._id).length < role.e_seats))
                        && role.e_method !== methodEnum.m3;

            });
            return filteredRoles.map(role => {
                if (role.e_meeting === meeting.m_type) {
                    role.e_seats = 0;
                    return role
                }
                // shitty hack. turning from num seats to seats filled.
                role.e_seats = (currentOfficers.filter(officer => officer.role === role._id));
                return role;
            });
        }

    }

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

    app.get("/api/democracy/getMeetingDetails", async function(req, res) {
        const webToken = getToken(req);
        let meeting = await slugToMeeting(req.query.slug)
        let admin = await checkAdmin(req, webToken)
        if (meeting.visible || admin) {
            let candidates = await db.candidates.findAsync({meeting: meeting._id});
            let motions = await db.motions.findAsync({meeting: meeting._id});
            let roles = await getApplicableRoles(meeting)
            let allRoles = await db.roles.findAsync({});
            candidates = await Promise.all(await candidates.map(async (candidate) => {
                candidate.role = allRoles.find(role => role._id === candidate.role);
                candidate.manifesto = await retrieveRichText(candidate.manifesto, "candidates");
                return candidate
            }));
            console.log(candidates)
            motions = await Promise.all(await motions.map(async (motion) => {
                motion.notes = await retrieveRichText(motion.notes, "motions");
                motion.believes = await retrieveRichText(motion.believes, "motions");
                motion.resolves = await retrieveRichText(motion.resolves, "motions");
                return motion
            }));
            console.log(roles)
            meeting.page = await retrieveRichText(meeting.page, "meetings");
            res.status(200);
            res.send({meeting: meeting, candidates: candidates, motions: motions, roles: roles});
        }
        else {
            res.status(401);
            res.send();
        }
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

    app.get("/api/democracy/getDocuments", async function(req, res) {
        let documents = await db.documents.findAsync({});
        res.status(200);
        res.send(documents);
    });

    app.get("/standing-orders", async function(req, res) {
        let documents = await db.documents.findAsync({"category": 1});
        documents.sort((a, b) => {return ((new Date(b.date)).valueOf() - (new Date(a.date)).valueOf())});
        console.log(documents)
        const latestDoc = documents[0];
        res.status(200);
        res.redirect("/files/documents/" + latestDoc._id + "/" + latestDoc.address);
        res.send();
    });

}

