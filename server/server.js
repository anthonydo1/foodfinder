import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as auth from './routes/authentication.js';
import * as search from './routes/search.js';

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

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


app.listen(PORT, () => console.log(`Running on http://${HOST}:${PORT}`));