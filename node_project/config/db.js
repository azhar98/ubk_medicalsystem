const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pathlogy"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
module.exports = con;