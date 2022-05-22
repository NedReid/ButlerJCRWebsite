# Butler JCR Website

This is a most definitely _work-in-progress_ website framework for future use by Butler JCR. This project is built using Express, React, and Tailwind. I personally use Webstorm for development, and Gitkraken for version control!


## Install instructions:
To access the webpage, follow these instructions:

**Step 1: Install Node.js**

This can be done from the [Node.js](https://nodejs.org/en/) Website.

**Step 2: Install frontend and backend scripts:** 

In a terminal from the project root, perform the following commands:
```
cd frontend 
npm install
```
And then in another terminal window:
```
cd backend 
npm install
```
Next, make a file named ".env" in /backend. These contain the sensitive information! a typical .env file will look like this:
```js
EMAILER_ADDRESS="some_email@some_email.com"         // Email the email verification will send from
EMAILER_PASSWORD="p@ssw0rd_for_dat_Em@il"           // Password for this email (or API password) 
TEST_EMAIL="your_personal_email@some_email.com"     // Emails will be sent here rather than uni one
SIGNATURE="v_random_key"                            // A 64-letter random key
ESIGNATURE="another_v_random_key"                   // A differerent 64-letter random key
ADMIN_USER="abcd12"                                 // Username with full admin access
```
You can generate a random alphanumeric key from a site like https://www.grc.com/passwords.htm.


**Step 3: Run and develop code:**

You should now have everything you need to run the project. Simply run the frontend in development mode by doing the following:
```
cd frontend 
npm run watch
```
And then in another terminal window run the backend:
```
cd backend 
npm run watch.
```
Note that these programs will automatically update when any changes are made.


## Roadmap

| Status | Feature |
| :---: | :--- |
| 🟡 | **User Login System**
| 🟢 | _Users can create and log in/out account_
| 🟢 | _Email verification_
| 🟢 | _Persistent logins_
| 🔴 | **JCR Debts System**
| 🔴 | _JCR Member database system_
| 🔴 | _View all JCR Debts_
| 🔴 | _Admin area for uploading debts_
| 🟡 | **Events Sign-up system**
| 🟢 | _Admin create signup page_
| 🔴 | _User signup page_
| 🔴 | _Different event signup selection settings_
| 🔴 | _Export of data, automatic debt system_



