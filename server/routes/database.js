import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
    host: "foodfinder.cjciu7tr27nm.us-west-1.rds.amazonaws.com",
    user: "admin",
    password: process.env.DATABASE_PASSWORD,
    database: "FoodFinder",
    insecureAuth : true
});

connection.connect((err) => {
    if (err) throw err;
    console.log("MySQL connected...");
});

export async function addUser(user) {
    const query = `INSERT INTO FoodFinder.users (first_name, last_name, username, email, password) 
    VALUES(?, ?, ?, ?, ?)`;

    connection.query(
        query,
        [user.first, user.last, user.username, user.email, user.password], 
        (error, results, fields) => {
            if (error) throw error;
            return results[0];
        }
    );
};

export async function getUsers() {
    connection.query("SELECT * FROM FoodFinder.users", (error, results, fields) => {
        if (error) throw error;
        return results[0].email;
    })
};

export async function findUserByUsernameAndEmail(username, email) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM FoodFinder.users WHERE USERNAME = ? OR EMAIL = ?",
            [username, email],
            (err, result) => {
                if (err) console.log(err);
                return err ? reject(err) : resolve(result[0]);
            }
        );
    });
};

export async function findUserByEmail(email) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM FoodFinder.users WHERE EMAIL = ?",
            [email],
            (err, result) => {
                if (err) console.log(err);
                return err ? reject(err) : resolve(result[0]);
            }
        );
    });
};