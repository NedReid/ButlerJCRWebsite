import "dotenv/config";
import express from "express";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import Datastore from '@seald-io/nedb';
import multer from 'multer';
import argon2 from 'argon2';
import { AuthService } from './helpers/authHelper.js';
import cookieParser from 'cookie-parser';
import { authRoutes } from "./routes/authRoutes.js";
import { adminRoutes } from "./routes/adminRoutes.js";
const db = {}
const upload = multer({dest:'files/'});
const auth = new AuthService();
db.users = new Datastore({ filename: 'database/users.db', autoload: true });
db.members = new Datastore({ filename: 'database/members.db', autoload: true });
db.admins = new Datastore({ filename: 'database/admins.db', autoload: true });
db.events = new Datastore({ filename: 'database/events.db', autoload: true });
db.eventBooking = new Datastore({ filename: 'database/eventBooking.db', autoload: true });
db.eventBookingPerson = new Datastore({ filename: 'database/events.db', autoload: true });

const app = express()
const port = 3001;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cookieParser());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.static(path.join(__dirname, '../../frontend/dist')));
app.use("/media", express.static(path.join(__dirname, '../media')));
authRoutes(app, auth, db);
await adminRoutes(app, auth, db);

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

// app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// const isNed = (req) => {return req.oidc.isAuthenticated() && req.oidc.user.email ==="ned-reid@sky.com" && req.oidc.user.email_verified}
//
// app.all('/api/admin', function(req, res, next) {
//     if (isNed(req)) {
//         next();
//     }
//     else {
//         res.status(401);
//         res.send();
//     }
// });

// app.get("/api/admin/getMusicData" , function(req, res) {
//     if(isNed(req)) {
//         try {
//             db.find( {}, function(err, docs)
//             {
//                 res.status(200);
//                 res.send(docs);
//             });
//         }
//         catch {
//             res.status(204);
//             res.send({ message: "Access Dennied"});
//         }
//     }
//     else {
//         res.status(204);
//         res.send({ message: "Access Dennnnied"});
//     }
// });

// app.post("/api/admin/saveSongDetails", function(req, res) {
//     console.log("saving song details");
//     if(isNed(req))
//     {
//         try {
//             db.update({_id:req.body._id}, req.body, {}, function(err, numReplaced) {
//                 console.log("updated", numReplaced)
//                 res.status(201);
//                 res.send();
//             });
//
//         }
//         catch {
//             res.status(204);
//             res.send();
//         }
//     }
//     else {
//         res.status(400)
//         res.send();
//     }
//
// });

// app.get("/api/admin/newSong", function(req, res) {
//     db.insert( {name:"new song"}, function(err, newDoc)
//     {
//         res.send(newDoc);
//     });
// });
//
// app.post("/api/admin/deleteSong" , function(req, res) {
//     db.remove( {_id:req.body._id}, function(err, numRemoved)
//     {
//         res.status(201);
//         res.send();
//     });
// });
//
// app.post("/api/admin/uploadSong",requiresAuth(), upload.single('file') , function(req, res) {
//     res.status(201);
//     res.send(req.file.filename);
// });


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// app.get("/api/getMusicData" , function(req, res) {
//     try {
//         db.find( {}, function(err, docs)
//         {
//             res.status(200);
//             res.send(docs);
//         });
//     }
//     catch {
//         res.status(204);
//         res.send({ message: "Access Dennied"});
//     }
// });
