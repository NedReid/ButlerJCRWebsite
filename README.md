# Butler JCR Website ❤️💛

This is the official website repository used by Butler JCR. This project is built using Express, React, and Tailwind. I personally use Webstorm for development, and Gitkraken for version control!

## Install instructions:

To access the webpage, follow these instructions:

**Step 1: Install Node.js**

This can be done from the [Node.js](https://nodejs.org/en/) Website. I use node 18.12.1 but any recent version
should work! You should also install [Git](https://git-scm.com/). (obviously!)

**Step 2: Install frontend and backend scripts:**

In a terminal from the project root, perform the following commands:

```
npm install
```

Then again from the project root:

```
cd frontend
npm install
```

And again from the project root:

```
cd backend
npm install
```

**Step 3: Set up configuration files**

Make a file named ".env" in /frontend. This should have the following information:

```js
WEB_ADDRESS = "http://localhost"; // Web address of website (Eg: localhost). Used for generating sitemap.
```

Next, make a file named ".env" in /backend. This should contain the following information

```js
EMAILER_ADDRESS = "some_email@some_email.com"; // Email the email verification will send from
EMAILER_PASSWORD = "p@ssw0rd_for_dat_Em@il"; // Password for this email (or API password)
TEST_EMAIL = "your_personal_email@some_email.com"; // All emails will be sent here if filled in
SIGNATURE = "v_random_key"; // A 64-letter random key
ESIGNATURE = "another_v_random_key"; // A differerent 64-letter random key
ADMIN_USER = "abcd12"; // Username with full admin access
WEB_ADDRESS = "http://localhost"; // Web address of site
STRIPE_SECRET_KEY = "STRIPE_ID"; // Stripe ID. Not needed as payments currently disabled.
STRIPE_PUBLISHABLE_KEY = "STRIPE_PUBLISHABLE_ID"; // Stripe public ID. Not needed as payments currently disabled.
PORT = 80; // Port the server should run from
```

To make a `SIGNATURE` and `ESIGNATURE` I tend to use this [key generator](https://www.grc.com/passwords.htm).

For the emailer address I use my personal address for development. If using Gmail, you will likely need an [App Password](https://support.google.com/accounts/answer/185833?hl=en).

**Step 4: Run and develop code:**

You should now have everything you need to run the project. Simply run the frontend in development mode by doing the following:

```
cd frontend
npm run watch
```

And then in another terminal window run the backend:

```
cd backend
npm run watch
```

Note that these programs will automatically update when any changes are made.

## Known issues/troubleshooting:

-   Currently, folders are not being created user-generated files are uploaded. The solution is to make the
    following directories:
    -   `/backend/files/`. Within `/backend/files`, make: - `albums`, `albumsPreview`, `calendarEvents`, `candidates`, `documents`, `editables`, `events`, `FAQ`, `posts`,
        `roles`, `sscLogos`, `SSCs`, and `whosWho`.
-   Several sections of the site currently break, show nothing, or load infinitely if unpopulated. While this isn't
    really a problem for the main site, you may encounter issues when trying to access certain pages while there is
    no content. The solution for this is to add content for each part of the website in the admin panel.
-   Some images, such as the homepage images for the site, are not currently included in the repository. This will cause
    certain links not to work on the main site. This should cause any major issues, but should be resolved in a future
    ticket.
