const express = require("express");
const app = express();
const morgan = require("morgan");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const knex = require("knex")(require("./knexfile"));
const bookshelf = require("bookshelf")(knex);
const bodyParser = require("body-parser");

// ==================================================== //
// walkthrough:
// API documentaton // https://www.npmjs.com/package/swagger-ui-express
// Can the .json be auto generated from current paths? // make docs ... https://www.npmjs.com/package/swagger-jsdoc // https://www.npmjs.com/package/swagger-ui
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// const swaggerDocuments = generateSwagger({
//   name: "Art Walks",
//   version: "0.1.1",
//   description: "Explore Local Art",
//   host: "localhost:8090",
//   basePath: "/",
// })
// ==================================================== //
// CRUD with React, Node.js, Express and MySQL
// https://dev.to/tienbku/react-node-js-mysql-crud-example-fc6
// https://bezkoder.com/react-node-express-mysql/
// ==================================================== //

// // parse requests of content-type - application/json
// app.use(bodyParser.json());
// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config();
const PORT = process.env.PORT || 8091;

// middleware
app.use(morgan("dev"));
app.use(logger("dev")); // morgan logger, network info in node console
app.use(helmet()); // small layer of security
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // <----- needed for POST and PUT -- https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded/51844327

// import router paths
const passportsRoute = require("./routes/passports");
const userRoute = require("./routes/user");
const favourtiesRoute = require("./routes/favourites");
const artWorksRoute = require("./routes/art_works");

app.use("/passports", passportsRoute);
app.use("/user", userRoute);
app.use("/favourites", favourtiesRoute);
app.use("/art_works", artWorksRoute);

const router = express.Router();
router.get("/", function (req, res) {
	// listen for a post on root
	res.json({ message: " -Success- " });
});

// https://www.youtube.com/watch?v=b9WlsQMGWMQ
// Coding a Full Registration and Login System JWT - NodeJS Tutorial

// error handler outputs json instead of drawing anything on the screen
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: (res.locals.error = req.app.get("env") === "development" ? err : {}),
	});
});
// Let user send username and password and insert that into database
// app.post("/register", (req, res) => {
// 	const { email, password } = req.body;
// 	// encrypt password before saving to database
//   // const hash = bcrypt.hash(password, 10);
//   bcrypt.hash(password, 10).then((hash) => {

//     knex("user")
// 			.insert([
// 				{
// 					email: req.body.email,
// 					password: hash,
// 				},
// 			])
// 			.then(() => {
// 				res.json("User Registered", user.rows[0]);
// 			})
// 			.catch((err) => {
// 				if (err) {
// 					res.status(400).json({ error: err });
// 				}
// 			});
//   })
//   if (err) throw err;
// 	res.json("register");
// });
app.post("/register", (req, res) => {
	// const { email, password } = req.body;
	// encrypt password before saving to database
	// const hash = bcrypt.hash(password, 10);
	// bcrypt.hash(password, 10).then((hash) => {
	const password = req.body.password;
	bcrypt.hash(password, 10, function (err, hash) {
		console.log("This is the hash: ", hash);
		knex.raw(
			"insert into user (email, password) values(?, ?)"[("Hello", "World")]
		);
	});
	// .then((hash) => {
	// 	knex.raw(
	// 		"insert into user (email, password) values(?, ?)"[("Hello", "World")]
	// 	);

	// knex("user")
	// 	.insert([
	// 		{
	// 			email: req.body.email,
	// 			password: hash,
	// 		},
	// 	])
	// 	.then(() => {
	// 		res.json("User Registered", user.rows[0]);
	// 	})
	// 	.catch((err) => {
	// 		if (err) {
	// 			res.status(400).json({ error: err });
	// 		}
	// 	});
	// });
	// if (err) throw err;
	res.json("register");
});

// https://blog.logrocket.com/querying-databases-with-knex-js/

// router.post("/", (req, res) => {
// 	queries
// 		.createUser(req.body.username, req.body.email, req.body.password)
// 		.then((user) => {
// 			res.json(user[0]);
// 		});
// });

// async createUser(username, email, password) {
//   try {
//       let password_hash = await argon.hash(password);
//       return knex('users').returning(['username', 'email']).insert({ username: username, email: email, password_hash: password_hash });
//   } catch (error) {
//       process.exit(1);
//   }
// },
// https://medium.com/@fajardocj/build-your-own-rest-api-with-node-express-knex-and-postgresql-part-5-6c6b57f85315

// Send a query to the database with the username and the password,
// then when it gets the user back, it will return a token based on the user info
// https://medium.com/swlh/build-your-own-rest-api-with-node-express-knex-and-postgresql-part-4-44205b1dc7f0
app.post("/login", (req, res) => {
	res.json("login");
});
// Only return this endpoint if the user is verified and logged in
app.post("/profile", (req, res) => {
	res.json("profile");
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

// Api Documentation
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
					exp: "http://localhost:8090/art_works/3",
				},
				{
					get: "get all artworks by neighbourhood",
					url: "http://localhost:8090/art_works/neighbourhood/:neighbourhood",
					exp: "http://localhost:8090/art_works/neighbourhood/Kitsilano",
				},
				{
					get: "get all artworks by title",
					url: "http://localhost:8090/art_works/title/:title",
					exp: "http://localhost:8090/art_works/title/Joe David",
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
