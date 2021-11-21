const cors = require("cors");
const express = require("express");


const app = express();

const db = require("./models");

//this will re-set the database everytime you start the server
db.sequelize.sync({ force: true }).then(() => {
  console.log("#droped the database and and re-synced.");
});


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Student App - Backend!!!" });
});

require("./routes/routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}.`);
});