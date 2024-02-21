const { response } = require("express");
let mysql = require('mysql');
const env = require('./env.js');
const config = require('./dbconfig.js')[env];

const login = async (req, res = response) => {
  console.log(req.body);
  const { email, password } = req.body;
  const db = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
  }
  );
  const QUERY = `SELECT * FROM users WHERE email = '${email}'`;

  // Ideally search the user in a database,
  // throw an error if not found.
  db.query(QUERY, (err, result) => {
    console.log(result);
    if (err) {
        console.log(err);
        return res.status(500).json({
            msg: "Internal server error",
        });
    }

    if (result.length === 0) {
        return res.status(400).json({
            msg: "User not found",
        });
    }

    const user = result[0];
    console.log(user.name_first);
    if (password !== user.login_password) {
      console.log("Invalid password");
        return res.status(400).json({
            msg: "Invalid password",
        });
    }

    // Replace the secret with your own secret key for JWT
    //const secretKey = 'your_secret_key';
    //const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
    // console.log("Successful login");
    res.json({
        title:user.name_title,
        firstname: user.name_first,
        lastname: user.name_last,
        picture: user.picture_thumbnail,
        token: "A JWT token to keep the user logged in.",
        msg: "Successful login",
    });
});
};

module.exports = {
  login,
};
