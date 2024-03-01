const { response } = require("express");
let mysql = require('mysql');
const env = require('./env.js');
const config = require('./dbconfig.js')[env];

const adduser = async (req, res = response) => {
  console.log(req.body);
  const { email, password } = req.body;
  const db = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
  }
  );
  db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});
  const QUERY = `INSERT INTO Users SET ?`;
  const userData = req.body;
  console.log(userData);
 
  // Ideally search the user in a database,
  // throw an error if not found.
  db.query(QUERY, userData, (err, result) => {
    if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error inserting data');
    } else {
        console.log('Data inserted successfully');
        res.status(200).send('inserted');
    }
});
};

module.exports = {
    adduser,
};
