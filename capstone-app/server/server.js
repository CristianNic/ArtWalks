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

// error handler outputs json instead of drawing anything on the screen
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: (res.locals.error = req.app.get("env") === "development" ? err : {}),
	});
});

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

// Home - API Documentation
app.get("/", (req, res) => {
	res.json({
		Welcome:
			"Welcome to my API of Public Art on display by the City of Vancouver",
		routes: {
			art_works: [
				{
					get: "get all art works",
					url: "http://localhost:8090/art_works",
				},
				{
					get: "get details for one art work",
					url: "http://localhost:8090/art_works/:id",
					ex: "http://localhost:8090/art_works/3",
				},
				{
					get: "get all artworks by neighbourhood",
					url: "http://localhost:8090/art_works/neighbourhood/:neighbourhood",
					ex: "http://localhost:8090/art_works/neighbourhood/Kitsilano",
				},
				{
					get: "get all artworks by title",
					url: "http://localhost:8090/art_works/title/:title",
					ex: "http://localhost:8090/art_works/title/Joe David",
				},
				{
					get: "get all artworks by artist",
					url: "http://localhost:8090/art_works/artist/:artist",
				},
				{
					get: "get all artworks by type",
					url: "http://localhost:8090/art_works/type/:type",
				},
			],
			favourites: [
				{
					get: "get favourite art works by user",
					url: "http://localhost:8090/favourites/:user_id",
				},
				{
					get: "get all art works added to favourites by all users",
					url: "http://localhost:8090/favourites",
				},
				{
					post: "post favourite art works by user",
					url: "",
				},
				{
					put: "put liked art works by user",
					url: "",
				},
			],
		},
	});
});

app.listen(PORT, console.log(`Server listening at: http://localhost:${PORT}`));
