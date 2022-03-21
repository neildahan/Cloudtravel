const { query } = require('express');
const mysql = require('mysql');


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'travel'
});

con.connect(
    err => {
        if (err) {
            console.log('connection failed');
            console.log(err);
        }
        else {
            console.log('DB connected successfully');
        }
    }
);

const myQuery = (q) => {
    return new Promise((resolve, reject) => {

        con.query(q, (err, results) => {
            if (err) {
                reject(err);
            }
            else {
               resolve(results);
            }
        });
    });
};


module.exports = { myQuery };