const express = require("express");
const passport = require("passport");
const router = express.Router();

let authRedirect = "/";

router.get("/loginFailed", (req, res, next) => {
	res.status(401).send("Could not authenticate with OAuth provider");
});

// GitHub Authenticate http://localhost:8090/login
router.get("/login", (req, res) => {
	authRedirect = req.query.from;
	passport.authenticate("github")(req, res);
});

// Logout
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(req.query.from);
});

// GitHub Auth CallBack/Redirect http://localhost:8090/auth
router.get("/auth", (req, res) => {
	passport.authenticate("github", {
		successRedirect: authRedirect,
		failureRedirect: "/loginFailed",
	})(req, res);
});

router.get("/check-auth", (req, res) => {
	if (req.user === undefined) return res.status(401).send("Unauthorized");
	res.status(200).json(req.user);
});

module.exports = router;
