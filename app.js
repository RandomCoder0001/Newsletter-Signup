const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

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
    var data = {
        members:[
        {
            email_address: email,
            status: "subscribed",
            merge_field:{
                FNAME: fname,
                LNAME: lname
            }
        }
    ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/4ce7a45de7"
    
    const option = {
        method: "POST",
        auth: "Akshay:f38bbf0e0905096c4d35381e16623818-us21"
    }

    const request = https.request(url ,option ,function(response){
        if(response.statusCode == 200)
        res.sendFile(__dirname + "/success.html");
        else
        res.sendFile(__dirname + ".failure.html");
        response.on("data" , function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})
// f38bbf0e0905096c4d35381e16623818-us21
// 4ce7a45de7