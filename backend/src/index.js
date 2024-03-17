import "dotenv/config";
import express from "express";
// import Stripe from "stripe";
import path from "path";
import exceptionHandler from "express-exception-handler";
import { dirname } from "path";
import { fileURLToPath } from "url";
import Datastore from "@seald-io/nedb";
import cors from "cors";
import shrinkRay from "@nitedani/shrink-ray-current";
import { AuthService } from "./helpers/authHelper.js";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/authRoutes.js";
import { adminRoutes } from "./routes/adminRoutes.js";
import { studentRoutes } from "./routes/studentRoutes.js";
import { getInvolvedRoutes } from "./routes/getInvolvedRoutes.js";
import { staticRoutes } from "./routes/staticRoutes.js";
import { democracyRoutes } from "./routes/democracyRoutes.js";
// import {paymentRoutes} from "./routes/paymentRoutes.js";
// import {userRoutes} from "./routes/paymentRoutes.js";
import fs from "fs";
import https from "https";
const db = {};
const auth = new AuthService();
db.users = new Datastore({ filename: "database/users.db", autoload: true });
db.members = new Datastore({ filename: "database/members.db", autoload: true });
db.admins = new Datastore({ filename: "database/admins.db", autoload: true });
db.events = new Datastore({ filename: "database/events.db", autoload: true });
db.eventBooking = new Datastore({ filename: "database/eventBooking.db", autoload: true });
db.SSCs = new Datastore({ filename: "database/SSCs.db", autoload: true });
db.editables = new Datastore({ filename: "database/editables.db", autoload: true });
db.pagePerms = new Datastore({ filename: "database/pagePerms.db", autoload: true });
db.roles = new Datastore({ filename: "database/roles.db", autoload: true });
db.officers = new Datastore({ filename: "database/officers.db", autoload: true });
db.meetings = new Datastore({ filename: "database/meetings.db", autoload: true });
db.motions = new Datastore({ filename: "database/motions.db", autoload: true });
db.candidates = new Datastore({ filename: "database/candidates.db", autoload: true });
db.posts = new Datastore({ filename: "database/posts.db", autoload: true });
db.postCategories = new Datastore({ filename: "database/postCategories.db", autoload: true });
db.payments = new Datastore({ filename: "database/payments.db", autoload: true });
db.products = new Datastore({ filename: "database/products.db", autoload: true });
db.calendarEvents = new Datastore({ filename: "database/calendarEvents.db", autoload: true });
db.keyValues = new Datastore({ filename: "database/keyValues.db", autoload: true });
db.FAQ = new Datastore({ filename: "database/FAQ.db", autoload: true });
db.documents = new Datastore({ filename: "database/documents.db", autoload: true });
db.whosWho = new Datastore({ filename: "database/whosWho.db", autoload: true });
db.photoAlbums = new Datastore({ filename: "database/photoAlbums.db", autoload: true });

exceptionHandler.handle();
const app = express();
const port = process.env.PORT;
const __dirname = dirname(fileURLToPath(import.meta.url));
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

app.use(shrinkRay());
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "150mb" })); // to support JSON-encoded bodies
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/media", express.static(path.join(__dirname, "../media")));
app.use("/files", express.static(path.join(__dirname, "../files")));
authRoutes(app, auth, db);
await adminRoutes(app, auth, db, __dirname);
await studentRoutes(app, auth, db);
await getInvolvedRoutes(app, auth, db);
await staticRoutes(app, auth, db);
await democracyRoutes(app, auth, db);
// await paymentRoutes(app, auth, db, stripe);
// await userRoutes(app, auth, db);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

function errorHandler(err, req, res) {
    res.status(500);
    res.redirect("/oh-no");
    console.log("error:", err);
}

app.use(errorHandler);

if (process.env.CERT_ADDRESS !== undefined) {
    const httpApp = express();
    httpApp.use((req, res, next) => {
        if (req.protocol === "http") {
            return res.redirect(301, `https://${req.headers.host}${req.url}`);
        }

        next();
    });
    console.log("Starting HTTPS server");
    const options = {
        cert: fs.readFileSync(process.env.CERT_ADDRESS),
        key: fs.readFileSync(process.env.KEY_ADDRESS),
    };
    // spdy.createServer(options, app).listen(443);
    https.createServer(options, app).listen(443);
    httpApp.listen(80);
} else {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
}
