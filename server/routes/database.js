import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "foodfinder",
    insecureAuth : true
});

connection.connect((err) => {
    if (err) throw err;
    console.log("MySQL connected...");
});

export async function addUser(user) {
    const query = `INSERT INTO USERS (first_name, last_name, username, email, password) 
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
    connection.query("SELECT * FROM USERS", (error, results, fields) => {
        if (error) throw error;
        return results[0].email;
    })
};

export async function findUserByUsernameAndEmail(username, email) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM USERS WHERE USERNAME = ? OR EMAIL = ?",
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
            "SELECT * FROM USERS WHERE EMAIL = ?",
            [email],
            (err, result) => {
                if (err) console.log(err);
                return err ? reject(err) : resolve(result[0]);
            }
        );
    });
};