// -----------------------------------------------------------------------//
// ToDo: determine tilt for front page parallax effect
// ToDo: determine direction phone is pointing/traveling on map
// -----------------------------------------------------------------------//
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
// Geolocation API




// -----------------------------------------------------------------------//
// Sensors
// https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs
// https://web.dev/generic-sensor/
// ask user permission 
navigator.permissions.query({ name: 'accelerometer' })
.then(result => {
  if (result.state === 'denied') {
    console.log('Permission to use accelerometer sensor is denied.');
    return;
  }
  // Use the sensor.
});

// An alternative approach is to attempt to use the error and listen for the SecurityError.
const sensor = new AbsoluteOrientationSensor();
sensor.start();
sensor.onerror = event => {
  if (event.error.name === 'SecurityError')
    console.log("No permissions to use AbsoluteOrientationSensor.");
};
// -----------------------------------------------------------------------//
// Gyroscope example
// Best: https://developer.mozilla.org/en-US/docs/Web/API/Gyroscope
// Doesn't work: https://github.com/mkosir/react-parallax-tilt/blob/master/src/react-parallax-tilt/ReactParallaxTilt.tsx
// Web Design Tutorial - HOW TO make Parallax effect - GitHub Page 404 - HTML & CSS
// https://www.youtube.com/watch?v=wxyxO6fAmyo
// https://github.com/designerdada/creative-404-page
let gyroscope = new Gyroscope({frequency: 60});

gyroscope.addEventListener('reading', e => {
  console.log("Angular velocity along the X-axis " + gyroscope.x);
  console.log("Angular velocity along the Y-axis " + gyroscope.y);
  console.log("Angular velocity along the Z-axis " + gyroscope.z);
});
gyroscope.start();