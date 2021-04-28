import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as auth from './routes/authentication.js';
import * as search from './routes/search.js';
import * as database from './routes/database.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0";


app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get('/users', authenticateToken, (req, res) => {
    res.send("Successfully authenticated");
});

app.post('/signup', async (req, res) => {
    await auth.signup(req, res);
});

app.post('/login', async (req, res) => {
    await auth.login(req, res);
});

app.get('/logout', async (req, res) => {
    res.send("Logged out");
});

app.post('/search', authenticateToken, (req, res) => {
    search.search(req, res);
});

app.get('/search/friends/:query', authenticateToken, async (req, res) => {
    if (req.params.query == null || req.params.query == undefined) res.status(401).send();
    const searchQuery = await database.findUserBySearchQuery(req.params.query);
    console.log(searchQuery);
    res.json(searchQuery);
});

app.get('/friends', authenticateToken, async (req, res) => {
    const id = await database.getIdByEmail(req.email);
    const friendRequests = await database.getFriendRequests(id);
    let promises = [];
    
    for (let i = 0; i < friendRequests.length; i++) {
        const requestData = await database.getUserById(friendRequests[i].user_id);
        promises.push(requestData);   
    }
    const data = await Promise.all(promises);
    res.json(data);
});

app.post('/friends', authenticateToken, async (req, res) => {
    const source = await database.getIdByEmail(req.email);
    const destination = await database.getIdByEmail(req.body.destination);

    if (source !== undefined && destination !== undefined) 
        database.createFriendRequest(source, destination, new Date());

    res.status(201).send();
});

app.post('/friends/create', authenticateToken, async (req, res) => {
    database.processFriendRequest(req.body.decision, req.email, req.body.destination);
    res.status(201).send();
});

app.get('/friendlist', authenticateToken, async (req, res) => {
    const source = await database.getIdByEmail(req.email);

    if (source !== undefined) {
        const data = await database.getFriendList(source);
        res.json(data);
    } else  {
        res.sendStatus(400);
    }
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email) => {
        if (err) return res.sendStatus(403);
        req.email = email.email;
        next();
    });
};


app.listen(PORT, () => console.log(`Running on http://${HOST}:${PORT}`));