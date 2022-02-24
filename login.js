const mysql = require("mysql")
const express = require("express")
const { use } = require("express/lib/router")
const app = express()
app.use('/assets', express.static('assets'))
const connections = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hello',
    database: 'logintest_db'
});

connections.connect(function(err){
    if (err)  throw err;
    else { 
        console.log("Connection is successfully established");
    }
});
//set app port to login
app.listen(4500);

app.get('/', function(req, res){
    res.sendFile(__dirname + './')
})
app.post('/', function(req, res){
    connections.query("select * from user where user_name = ? and password = ?", function(err, results, fields){
        if(results.length > 0){
            res.redirect('/homepage.html');
        }
        else{

        }
    });
})
