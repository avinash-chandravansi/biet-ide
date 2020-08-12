const ejs = require("ejs");
const fetch = require("node-fetch");
const express = require("express");
const app = express();
const fs = require("fs");

const csvjson = require("csvjson");
const path = require("path");

const port = 3000;
const bodyParser = require("body-parser");
var question_1 = `Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]).
\n
Return the running sum of nums.

<br><br>
<strong>Example 1:</strong>
<br>
<strong>Input: </strong> <br>4<br> 1 2 3 4 \n<br>
<strong>Output: </strong>
<br>1 3 6 10 \n<br>
Explanation: Running sum is obtained as follows: [1, 1+2, 1+2+3, 1+2+3+4].`;
//app.use(bp.urlencoded({ extended: true }npm ));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/:id", (req, res) => {
  console.log(req.params.id);

  fs.readFile("./main_database.json", "utf-8", (err, data) => {
    var data_filter = JSON.parse(data);
    var cc = parseInt(req.params.id) - 1;
    res.render("show", {
      data_sent: JSON.stringify(data_filter[cc]),
      data_sent_json: data_filter[cc],
    });
  });
});

app.post("/", (req, res) => {
  //console.log(req.body);
  var compile_code = req.body.code;
  var cc = 1;
  var dat = {
    LanguageChoice: "28",
    Program: compile_code,
    Input: "",
    CompilerArgs: "",
  };

  fetch("https://rextester.com/rundotnet/api", {
    method: "POST",
    data: dat,
  }).then((res) => {
    console.log(res);
  });
});
app.listen(process.env.PORT || 3001, () =>
  console.log(`Myapp listening on port port!`)
);

fs.readFileSync("./database.csv", "utf-8", (error, data) => {
  if (error) {
    console.log("Error");
  } else {
    const obj = csvjson.toObject(data);

    const myConsole = new console.Console(
      fs.createWriteStream(path.join(__dirname, "./main_database.json"))
    );

    myConsole.log(JSON.stringify(obj));
  }
});
