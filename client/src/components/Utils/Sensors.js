// -----------------------------------------------------------------------//
// ToDo: Login page parallax effect while phone is tilted (like GitHub 404 page)
// ToDo: Determine direction phone is pointing/traveling on map
// -----------------------------------------------------------------------//
//
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
// https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs
// https://web.dev/generic-sensor/
//
// Ask user permission
navigator.permissions.query({ name: "accelerometer" }).then((result) => {
	if (result.state === "denied") {
		console.log("Permission to use accelerometer sensor is denied.");
		return;
	}
	// use the sensor
});
// An alternative approach is to attempt to use the error and listen for the SecurityError.
const sensor = new AbsoluteOrientationSensor();
sensor.start();
sensor.onerror = (event) => {
	if (event.error.name === "SecurityError")
		console.log("No permissions to use AbsoluteOrientationSensor.");
};

// -----------------------------------------------------------------------//
// Gyroscope example
// https://developer.mozilla.org/en-US/docs/Web/API/Gyroscope
// Didn't work: https://github.com/mkosir/react-parallax-tilt/blob/master/src/react-parallax-tilt/ReactParallaxTilt.tsx
// Web Design Tutorial - How to make Parallax effect - GitHub Page 404 - HTML & CSS - https://www.youtube.com/watch?v=wxyxO6fAmyo
// Creative 404 Error Page Using Parallax.js - https://github.com/designerdada/creative-404-page

let gyroscope = new Gyroscope({ frequency: 60 });

gyroscope.addEventListener("reading", (e) => {
	console.log("Angular velocity along the X-axis " + gyroscope.x);
	console.log("Angular velocity along the Y-axis " + gyroscope.y);
	console.log("Angular velocity along the Z-axis " + gyroscope.z);
});
gyroscope.start();
