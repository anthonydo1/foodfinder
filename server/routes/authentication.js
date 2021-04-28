import bcrypt from 'bcrypt';
import * as database from './database.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function signup(req, res) {
    try {
        const data = await database
            .findUserByUsernameAndEmail(req.body.username, req.body.email);

        const userFromEmail = await database.findUserByEmail(req.body.email);

        if (data !== undefined) {
            if (userFromEmail !== null) {
                console.log(userFromEmail);
                return res.status(501).send("Email already exists");  
            } else {
                console.log("Username exists already");
                return res.status(500).send("Username/email already exists");
            }  
        };

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        const user = {
            first: req.body.first,
            last: req.body.last,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        };
        
        database.addUser(user);
        res.status(201).send();
    } catch {
        console.log("uh OH");
        res.status(500).send();
    }
}

export async function login(req, res) {
    const user = await database.findUserByEmail(req.body.email)
    if (user == null) {
        return res.status(400).send("Cannot find user");
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const userData = { email: user.email };
            const accessToken = jwt.sign(
                userData, 
                process.env.ACCESS_TOKEN_SECRET);
                
            // res.writeHead(200, {
            //     "Set-Cookie": `token=${accessToken}; HttpOnly`,
            //     "Access-Control-Allow-Credentials": "true"
            // }).send();

            res.json({ accessToken: accessToken, user: user.username}).send();
        } else {
            res.status(401).send("Incorrect login credentials");
        }
    } catch {
        res.status(500).send();
    }
}
