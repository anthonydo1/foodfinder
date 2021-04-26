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
                if (result === undefined || result.length == 0) return resolve(null);
                return err ? reject(err) : resolve(result[0]);
            }
        );
    });
};

export async function getIdByEmail(email) {
    console.log(email);
    const query = `SELECT * FROM FoodFinder.users WHERE EMAIL =` + connection.escape(email);
    
    return new Promise((resolve, reject) => {
        connection.query(
            query,
            (err, result) => {
                if (err) console.log(err);
                if (result === undefined || result.length == 0) return resolve(null);
                return err ? reject(err) : resolve(result[0].id);
            }
        );
    });
};

export async function getFriendRequests(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM FoodFinder.friendship_request WHERE follower_id = ?", [id], (error, results, fields) => {
            if (error) console.log(error);
            return error ? reject(error) : resolve(results);
        });
    });
};

export async function createFriendRequest(source, destination) {
    const query = `
        INSERT INTO FoodFinder.friendship_request (user_id, follower_id, date_requested) 
        VALUES(?, ?, ?)`;

    return new Promise((resolve, reject) => {
        connection.query(query, [source, destination, new Date()], (error, results, fields) => {
            if (error) console.log(error);
            return error ? reject(error) : resolve(results);
        });
    });
};

export async function findUserBySearchQuery(keyword) {
    const query = `SELECT * FROM FoodFinder.users WHERE username = ? OR email = ?`;

    return new Promise((resolve, reject) => {
        connection.query(query, [keyword, keyword], (error, results, fields) => {
            if (error) console.log(error);
            if (results === undefined || results.length == 0) return resolve(null);

            results.forEach((obj) => {
                obj.password = null;
            });

            return error ? reject(error) : resolve(JSON.stringify(results));
        });
    });
}

export async function getUserById(id) {
    const query = `SELECT * FROM FoodFinder.users WHERE id = ?`;

    return new Promise((resolve, reject) => {
        connection.query(query, [id], (error, results, fields) => {
            if (error) console.log(error);
            if (results === undefined || results.length == 0) return resolve(null);

            results.forEach((obj) => {
                obj.password = null;
            });
            
            return error ? reject(error) : resolve(results[0]);
        });
    });
}

export async function processFriendRequest(decision, source_email, destination_email) {
    const sourceId = await getIdByEmail(source_email);
    const destId = await getIdByEmail(destination_email);

    const insertQuery = `
            INSERT INTO FoodFinder.friendships (user_id, follower_id, date_followed) 
            VALUES(?, ?, ?)`;

    const deleteQuery = `
            DELETE FROM FoodFinder.friendship_request WHERE user_id = ? AND follower_id = ?`;

    if (decision) {
        const date = new Date();
        connection.query(insertQuery, [sourceId, destId, date]);
        connection.query(insertQuery, [destId, sourceId, date]);
        connection.query(deleteQuery, [sourceId, destId]);
        connection.query(deleteQuery, [destId, sourceId]);
    } else {
        connection.query(deleteQuery, [sourceId, destId]);
        connection.query(deleteQuery, [destId, sourceId]);
    }
}


