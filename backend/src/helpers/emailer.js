import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    pool: true,
    host: "smtppro.zoho.eu",
    port: 465,
    secure: true, // use TLS
    auth: {
        user: process.env.EMAILER_ADDRESS,
        pass: process.env.EMAILER_PASSWORD,
    },
});

export const sendVerificationMail = async (username, verificationToken) => {
    const htmlContent = `<h1>Josephine Butler College JCR</h1>
                    <h2>Verify your account login</h2>
                    <p>Hello, ${username}</p>
                    <p>Pretty please with a cherry on top could you verify your email? You can do so by clicking this link:</p>
                    <a href='${process.env.WEB_ADDRESS}/api/verifyLogin/${verificationToken}'>${process.env.WEB_ADDRESS}/api/verifyLogin/${verificationToken}</a>
                    <br>
                    <p>Many Thanks,</p>
                    <p>Butler JCR</p>`;
    let addr = username + "@durham.ac.uk"
    if (process.env.TEST_EMAIL !== undefined && process.env.TEST_EMAIL.length > 0)
    {
        addr = process.env.TEST_EMAIL
    }
    var message = {
        from: process.env.EMAILER_ADDRESS,
        to: addr,
        // to: username + "@durham.ac.uk",
        subject: "❤💛 Verify your Butler JCR Account 💛❤",
        text: "You need to be able to view HTML to view this message.",
        html: htmlContent
    };

    await transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });
    transporter.sendMail(message);
}

export const sendPasswordResetEmail = async (username, resetToken) => {
    const htmlContent = `<h1>Josephine Butler College JCR</h1>
                    <h2>Reset your password</h2>
                    <p>Hello, ${username}</p>
                    <p>Someone has requested to reset your password! If it is you, please click this password reset link within 24 hours:</p>
                    <a href='${process.env.WEB_ADDRESS}/reset-password/${resetToken}'>${process.env.WEB_ADDRESS}/reset-password/${resetToken}</a>
                    <p>If this is not you, please ignore this email. If you receive this email repeatedly, please contact the webmaster.</p>
                    <br>
                    <p>Many Thanks,</p>
                    <p>Butler JCR</p>`;
    let addr = username + "@durham.ac.uk"
    if (process.env.TEST_EMAIL !== undefined && process.env.TEST_EMAIL.length > 0)
    {
        addr = process.env.TEST_EMAIL
    }
    var message = {
        from: process.env.EMAILER_ADDRESS,
        to: addr,
        // to: username + "@durham.ac.uk",
        subject: "❤💛 Butler JCR: Password reset request 💛❤",
        text: "You need to be able to view HTML to view this message.",
        html: htmlContent
    };

    await transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });
    transporter.sendMail(message);
}

export const sendFeedback = async (feedback) => {
    const htmlContent = `<h1>Josephine Butler College JCR</h1>
                    <h2>Website Feedback</h2>
                    <p><b>User: ${feedback.name}</b></p>
                    <p><b>Email: ${feedback.email}</b></p>
                    <p><b>Type: ${feedback.type}</b></p>
                    ${feedback.details}`;
    console.log(htmlContent)
    var message = {
        from: process.env.EMAILER_ADDRESS,
        to: process.env.EMAILER_ADDRESS,
        subject: "WEBSITE FEEDBACK - " + feedback.type,
        text: "You need to be able to view HTML to view this message.",
        html: htmlContent
    };

    await transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });
    transporter.sendMail(message);
}

