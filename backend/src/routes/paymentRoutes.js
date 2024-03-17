export const paymentRoutes = async (app, auth, db, stripe) => {
    app.use("/api/payments", async function (req, res, next) {
        const webToken = auth.checkToken(req.cookies["loginToken"]);
        const foundUser = await db.users.findOneAsync({ username: webToken.username });
        if (foundUser !== null && foundUser.registered) {
            res.locals.user = foundUser;
            console.log("hhhh");
            next();
        } else {
            res.status(401);
            res.send();
        }
    });

    app.post("/api/payments/payLevy", async (req, res) => {
        console.log("Making Peement");
        const url = process.env.WEB_ADDRESS;
        const levy = await db.products.findOneAsync({ name: "JCR Levy" });
        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ["a"],
            client_reference_id: res.locals.user.username + "_levy",
            metadata: { username: res.locals.user.username },
            line_items: [
                {
                    price_data: {
                        currency: "gbp",
                        product_data: {
                            name: "JCR Levy - " + res.locals.user.username,
                        },
                        unit_amount: levy.price * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${url}/api/payments/levyPaid?id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${url}/error`,
        });
        res.json({ id: session.id });
    });

    app.get("/api/payments/levyPaid", async function (req, res) {
        console.log("Beams");
        console.log(req.query);
        const session = await stripe.checkout.sessions.retrieve(req.query.id);
        const customer = session.metadata.username;
        const status = session.payment_status;
        const intent = session.payment_intent;
        const cdate = new Date(session.created * 1000);
        let expiry = new Date(cdate.getFullYear() + 3, 8, 1);
        if (cdate.getMonth() < 6) {
            expiry = new Date(cdate.getFullYear() + 2, 8, 1);
        }
        console.log(expiry);
        console.log(expiry.getTime());
        if (status === "paid") {
            res.redirect("/pay");
            console.log("Yayy!");
            await db.members.insertAsync({
                username: customer,
                expiry: expiry.getTime(),
                transaction: intent,
            });
        }
        // let product = await db.products.findOneAsync({name:req.query.name});
        res.status(200);
        res.send();
    });

    app.get("/api/payments/getProducts", async function (req, res) {
        let products = await db.products.findAsync({});
        res.status(200);
        res.send(products);
    });

    app.get("/api/payments/getProductByName", async function (req, res) {
        let product = await db.products.findOneAsync({ name: req.query.name });
        res.status(200);
        res.send(product);
    });
};
