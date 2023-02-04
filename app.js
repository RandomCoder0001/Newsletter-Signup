const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const request = require("request");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.listen(3000 , function(){
    console.log("server is running on 3000");
});

app.get("/" , function(req ,  res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/" ,function(req , res){
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const email = req.body.email;
    console.log(fname + lname + email);
})
// 4ff7d7541c1a6acb9e3c16f7d55c56cc-us21
// 4ce7a45de7