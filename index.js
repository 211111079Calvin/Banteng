const express = require('express');
const app = express();
const mysql = require('mysql2');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_form',
});
app.use('/img', express.static('img'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/' + 'index.html');
});
app.get('/movie', (req, res) => {
  res.sendFile(__dirname + '/' + 'movie.html');
});

app.get('/movie2', (req, res) => {
  res.sendFile(__dirname + '/' + 'movie2.html');
});
connection.connect();
app.get('/register', function (req, res) {
  var fname = req.query.fname;
  var lname = req.query.lname;
  var username = req.query.username;
  var gender = req.query.gender;
  var email = req.query.email;
  var city = req.query.city;
  var password = req.query.password;
  var address = req.query.address;
  var confirm = req.query.confirm;

  var check = "select * from registration where email = '" + email + "' or username = '" + username + "'";
  connection.query(check, function (err, result) {
    if (err) {
      throw err;
    } else if (result.length !== 0) {
      c 
    } else {
      var user = {
        fname: fname,
        lname: lname,
        username: username,
        gender: gender,
        email: email,
        city: city,
        password: password,
        address: address,
      };

      if (password !== confirm) {
        console.log('password and confirm password not match');
      } else {
        connection.query('insert into registration set ?', user, function (err, rs) {
          if (err) console.log(err);
          console.log('Form submitted successfully');
          res.redirect('/login');
        });
      }
    }
  });
});

app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/' + 'login.html');
  var username = req.query.username;
  var password = req.query.password;
  var check = "select * from registration where username = '" + username + "' AND password = '" + password + "'";
  connection.query(check, function (err, result) {
    if (err) {
      throw err;
    } else if (result.length > 0) {
      console.log('Selamat Datang');
      res.redirect('/movie2');
    } else {
      console.log('Password atau Username ada yang salah');
    }
  });
});

app.listen(3000, function () {
  console.log('server started');
});
