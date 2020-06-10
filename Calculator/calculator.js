const express = require("express"), bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res) {
    res.sendFile(__dirname+"/index.html");
});
app.post("/", function(req, res) {
    var height = req.body.height;
    var weight = req.body.weight;
    var bmi = weight / (height*height);
    res.send("Yor BMI is "+bmi);
});
app.listen(3000, function() {
    console.log("Active at 3000");
})