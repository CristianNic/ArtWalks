const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 5001;

// middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // <----- needed for POST and PUT -- https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded/51844327

const userRoute = require("./routes/user");
const favourtiesRoute = require("./routes/favourites");
const artWorksRoute = require("./routes/art_works");

app.use("/user", userRoute);
app.use("/favourites", favourtiesRoute);
app.use("/art_works", artWorksRoute);

// app.use(function (req, res, next) {
// 	res.status(404).send("Invalid API access");      <----- What is this used for again?
// });

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

// const publicArt = require("./routes/publicArt");
// const localAreaBoundaries = require("./routes/localAreaBoundaries");

// https://covapp.vancouver.ca/PublicArtRegistry/_image.aspx/tDMNbF-41qBPcKfm_Ranl5jigZUdZSNeTsqMi9mOP5w=/M2630%20Main%20Street%20-%20Bure.JPG

// home
app.get("/", (req, res) => {
	res.json({
		Greeting:
			"Welcome to my API of Public Art on display by the City of Vancouver",
	});
});

app.listen(PORT, console.log(`Server listening at: http://localhost:${PORT}`));
