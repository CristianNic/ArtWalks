const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const register = require("./routes/register");

app.use("/register", register);     // <---- What do we put in register? 


const publicArt = require("./routes/publicArt");
const localAreaBoundaries = require("./routes/localAreaBoundaries");

// app.use(function (req, res, next) {
// 	res.status(404).send("Invalid API access");      <----- What is this used for again? 
// });

// middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/public_art", publicArt);
app.use("/local_area_boundaries", localAreaBoundaries);

app.listen(PORT, console.log(`Server listening at: http://localhost:${PORT}`));

