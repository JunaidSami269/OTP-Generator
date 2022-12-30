const mysql = require("mysql2");

// Open the connection to MySQL server
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password:'mydbpass',
});

// Run create database statement
connection.query(
  `CREATE DATABASE IF NOT EXISTS productboxdb`,
  function (err, results) {
    console.log(`database connection error:${err}`);
  }
);

// Close the connection
connection.end();