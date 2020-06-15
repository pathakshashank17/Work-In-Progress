const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
const API_KEY = "9ccea7e3d35f163e5b5391c0dbd6ffcd-us10";
const LIST_ID = "e92251ffd8;"

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/public/signup.html");
});

app.post("/", function(req, res) {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    var dataForApiRequest = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName
            }
        }]
    };
    dataForApiRequest = JSON.stringify(dataForApiRequest);
    const url = "https://us10.api.mailchimp.com/3.0/lists/e92251ffd8";
    const options = {
        method: "POST",
        auth: "sha:9ccea7e3d35f163e5b5391c0dbd6ffcd-us10"
    };
    const request = https.request(url, options, function(response) {
        response.on("data", function(data) {
            data = JSON.parse(data);
            console.log(data);
        })
        if (response.statusCode == 200) {
            res.sendFile(__dirname+"/public/success.html");
        } else {
            res.sendFile(__dirname+"/public/failure.html");
        }
    });
    request.write(dataForApiRequest);
    request.end();
});

app.post("/failure", function(req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Active at 3000 & process.env.PORT");
});