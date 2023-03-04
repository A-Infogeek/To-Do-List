const express = require("express");
const bodyParser = require("body-parser");
const date=require(__dirname+"/date.js");

const app = express();
var items = ["Buy Food", "Cook Food", "Eat Food"];
var workList = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    let day=date.getDate();
    res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
    var item = req.body.newItem;
    if (req.body.list === "Work List") {
        workList.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workList });
})

app.post("/work", function (req, res) {
    let item = req.body.newItem;
    workList.push(item);
    res.redirect("/work");
})

app.listen(3000,'0.0.0.0', function () {
    console.log("Server started at port 3000");
});