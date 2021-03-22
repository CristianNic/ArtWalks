const fs = require("fs");

function loadData() {
	return fs.readFileSync("../local-area-boundary.json", "utf8");
}

const localAreaBoundary = JSON.parse(loadData());

async function compileJSON() {
	const emptyArr = [];
	console.log("Formatting neighbourhoods");
	//console.log(publicArt[0].geom);
	for (let i = 0; i < localAreaBoundary.length; i++) {
		console.log("Inside for loop " + [i + 1]);
		const output = {
			neighbourhood: localAreaBoundary[i].fields.name,
			geom_point: localAreaBoundary[i].geometry.coordinates,
			geom_polygon: localAreaBoundary[i].fields.geom.coordinates,
		};
		emptyArr.push(output);
	}
	fs.writeFile("local_area_boundary.js", JSON.stringify(emptyArr), (err) => {
		if (err) throw err;
		console.log("The image JSON has been saved!");
	});
}

compileJSON();
