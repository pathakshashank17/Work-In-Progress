const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set("view engine", "ejs");

var day, newTask = [];
app.get("/", function(req, res) {
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    day = today.toLocaleDateString("en-US", options);
    res.render('list', {day: day, newTask: newTask});
});

app.post("/", function(req, res) {
    newTask.push(req.body.newTask);
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started");
});