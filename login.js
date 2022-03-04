const mysql = require("mysql")
const express = require("express")
const { use } = require("express/lib/router")
const app = express()
const bodyparser = require("body-parser")
var encoder = bodyparser.urlencoded();

app.use('/assets', express.static('assets'))
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hello',
    database: 'logintest_db'
});

connection.connect(function(err){
    if (err)  throw err;
    else { 
        console.log("Connection is successfully established");
    }
});
//set app port to login
app.listen(4500);

app.get('/', function(req, res){
    res.sendFile(__dirname + "/login.html");
})
app.post('/', encoder, function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    connection.query("select * from login_tb where email = ? and password = ?", [email, password], function(err, results, fields){
        if(results.length > 0){
            res.redirect('/home');
        }
        else if(err)throw err;
        else{
            res.redirect("/");
        }
        res.end();
    });
})
app.get('/home', function(req, res){
    res.sendFile(__dirname + "/home.html")
})
