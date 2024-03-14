export const userRoutes = async (app, auth, db) => {


    app.use("/api/user", async function (req, res, next) {
        const webToken = auth.checkToken(req.cookies['loginToken']);
        const foundUser = await db.users.findOneAsync({username: webToken.username});
        console.log(foundUser);
        if (foundUser !== null) {
            res.locals.user = foundUser;
            next();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/user/updateDisplayName", async function (req, res) {
        let displayName = req.body.displayName
        await db.members.updateAsync({_id:res.locals.user._id},{displayName: displayName})
        res.status(200);
        res.send();

    });

    app.get("/api/user/getUser", async function (req, res) {

        let cleanUser = res.locals.user;
        cleanUser.password = "";
        res.status(200);
        res.send(cleanUser);

    });}

