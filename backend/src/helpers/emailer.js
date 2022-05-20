import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
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
                    <a>http://localhost:3001/api/verifyLogin/${verificationToken}</a>
                    <br>
                    <p>Many Thanks,</p>
                    <p>Ned Reid</p>`;

    var message = {
        from: process.env.EMAILER_ADDRESS,
        to: process.env.TEST_EMAIL,
        // to: username + "@durham.ac.uk",
        subject: "Bad Message",
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

