const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "website")));

// Global variables
let projectData = {};
let port = 3000;
let url = `http://localhost:${port}`;

app.post("/postdata", (req, res) => {
  let { temp, newDate, feelings ,city } = req.body;
  projectData.temp = temp;
  projectData.date = newDate;
  projectData.feelings = feelings;
  projectData.city = city;
  console.log(
    "Start POST data : ================================================"
  );
  console.log(projectData);
  res.status(204).send();
  console.log(
    "End POST data: ================================================"
  );
});

app.get("/getall", function (req, res) {
  res.send(projectData);
});

app.listen(port, () => {
  console.log(`Server listening on ${url}`);
});
