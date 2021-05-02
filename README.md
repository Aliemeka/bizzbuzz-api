# bizzbuzz-api

BizzBuzz API, a makeshift social media application that allows user to create long post messages.


## Set up
- Clone the project in your local computer
- Enter <code>npm install</code> or <code>yarn start</code> to install all dependencies
- Terminal/CLI command: <code>npm run setup:env</code> to create .env file based on the .env.example file. This command creates the file along with error message in Windows, Linux or MacOS printed command prompt, bash or terminal. This is fine it is due to the command used, one tries for Windows if fails it try for Linux/Mac.
- You to ensure you have all listed environment variables. Check [config.js](/utils/config.js "config.js") to see the required node.js server
- Run <code>npm run dev</code> on your terminal or command line interface to run the server in developement mode. 
- Start the server with <code>npm start</code>


## Dependencies
### Main dependencies
[Express.js](https://expressjs.com "express.js") for api server<br>
[mongoose](https://mongoosejs.com "mongoose") - Mongodb ORM for crud operations<br>
[jsonwebtoken](https://npmjs.com/package/jsonwebtoken "jsonwebtoken") to create authorization tokens<br>
[bcrypt](https://npmjs.com/package/bcrypt "bcrypt") for hashing passwords and tokens<br>
[SendGrid Mail](https://npmjs.com/package/@sendgrid/mail "@sendgrid/mail") for sending emails<br>
[dotenv](https://npmjs.com/package/dotenv "dotenv") for parsing envvironment variables<br>
[Cloudinary Node.js SDK](https://cloudinary.com/node_integration "cloudinary-js-sdk")

### Dev dependencies
[Nodeemon](https://npmjs.com/package/nodemon "nodemon") monitoring script of node.js development

## Routes
### Auth routes <code>/auth</code>
- **POST** <code>/auth/register</code> to register a new user
- **POST** <code>/auth/login</code> logins a new user
- **POST** <code>/auth/change-password</code> changes user password*
- **POST** <code>/auth/reset-password</code> request a password resets*
- **POST** <code>/auth/confirm-reset?token={{token}}&id={{id}}</code> resets to new password*

### Posts routes <code>/posts</code>
- **GET** <code>/posts/r</code> gets all post
- **POST** <code>/posts/</code> adds a new post*
- **GET** <code>/posts/{postId}</code> gets a post*
- **PUT** <code>/posts/{postId}</code> updates a post* **
- **DELETE** <code>/posts/{postId}</code> deletes a post* **

<code>*</code> *requires jwt token on Authorization header of request*
<code>**</code> *requires that user is the author of post*


## Contribution
When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change. 

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Pull Request Process
1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
3. Make all pull requests of new features to the **develop** branch so it can be project