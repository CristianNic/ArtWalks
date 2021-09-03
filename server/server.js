const express = require("express");
// const session = require("express-session"); // session id on server session cookie on client
const app = express();
const morgan = require("morgan");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const knex = require("knex")(require("./knexfile"));
// const bookshelf = require("bookshelf")(knex);
// const bodyParser = require("body-parser");

const passport = require("passport");
// const GitHubStrategy = require("passport-github").Strategy;

require("dotenv").config();
const PORT = process.env.PORT || 8090;

//=================== Middleware =========================//
app.use(morgan("dev"));
app.use(logger("dev"));
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//================== Passport Config ======================//
// const passportConfig = {
// 	clientID: process.env.CLIENT_ID,
// 	clientSecret: process.env.CLIENT_SECRET,
// 	callbackURL: process.env.CALLBACK_URL,
// };
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user, cb) => {
// 	cb(null, user);
// });

// passport.deserializeUser((user, cb) => {
// 	cb(null, user);
// });

//================== Import Router Paths ===================//

const passportsRoute = require("./routes/passports");
const userRoute = require("./routes/user");
const favourtiesRoute = require("./routes/favourites");
const artWorksRoute = require("./routes/art_works");

app.use("/passports", passportsRoute);
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

app.post("/register", (req, res) => {
	const password = req.body.password;
	bcrypt.hash(password, 10, function (err, hash) {
		console.log("This is the hash: ", hash);
		knex.raw(
			"insert into user (email, password) values(?, ?)"[("Hello", "World")]
		);
	});
	res.json("register");
});

//=================== Working Login Route ====================//

const User = require("./models/user");

app.post("/login", (req, res) => {
	console.log("Server received req.body:", req.body);
	const { email, password } = req.body;

	User.where({ email: email, password: password })
		.fetch()
		.then((found) => {
			res.status(200).json({ user_id: found.attributes.id });
		})
		.catch((error) => {
			res.status(404).json({
				error:
					" ¯_(ツ)_¯ email and password not found, check password or signup new user",
			});
		});
});

// Get all users
app.get("/users", (req, res) => {
	console.log("Server received req.body:", req.body);
	console.log("Server received req.params:", req.params);
	User.where(req.query)
		.fetchAll()
		.then((users) => {
			const usersMapped = users.map((user) => {
				return user;
			});
			res.status(200).json(usersMapped);
		});
});

// Sign up new user
app.post("/signup", (req, res) => {
	console.log("Server received SignUp request: ", req.body);
	const signUpTime = new Date();

	User.where({ email: req.body.email })
		.fetch({ require: true })
		.then((found) => {
			if (found.attributes.email.length > 0) {
				res.status(200).json({
					message: "email already exists, reset password",
					user_id: found.attributes.id,
				});
			} else if ((found.attributes.email.length = 0)) {
				new User({
					name: "name",
					email: req.body.email,
					password: req.body.password,
					created_at: signUpTime,
					updated_at: null,
					location_created_at: "",
					location_current: "",
					profile_image_url: "",
				})
					.save()
					.then((user) => {
						res.status(200).json({ message: "signed up new user", user });
					})
					.catch(() => {
						res.status(400).json({ error: "unable to signup" });
					});
			}
		});
});

// Only return this endpoint if the user is verified and logged in
app.post("/profile", (req, res) => {
	res.json("profile");
});

// ======================== API Documentation ========================= //
// TODO: use Swagger https://www.npmjs.com/package/swagger-ui-express

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
			users: [
				{
					get: "get all users in db (for development only)",
					url: "http://localhost:8090/users",
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
