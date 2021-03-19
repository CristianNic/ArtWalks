const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;
const register = require("./routes/register");

app.use("/register", register);     // <---- What do we put in register? 

// const publicArt = require("./routes/publicArt");
// const localAreaBoundaries = require("./routes/localAreaBoundaries");

const ArtWorks   = require("./routes/art_works");
const Favourties = require("./routes/favourites");
const User       = require("./routes/user");
   

// app.use(function (req, res, next) {
// 	res.status(404).send("Invalid API access");      <----- What is this used for again? 
// });

// middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());


app.listen(PORT, console.log(`Server listening at: http://localhost:${PORT}`));




// const express = require("express");
// const Warehouse = require("../models/warehouse");
// const router = express.Router();

// router
// .route("/")  // 
// .get((req, res) => {
//     Warehouse.where(req.query)
//     .fetchAll({ withRelated: ["inventories"] })
//     .then(warehouses => {
//         res.status(200).json(warehouses);
//     });
// })





// https://covapp.vancouver.ca/PublicArtRegistry/_image.aspx/tDMNbF-41qBPcKfm_Ranl5jigZUdZSNeTsqMi9mOP5w=/M2630%20Main%20Street%20-%20Bure.JPG