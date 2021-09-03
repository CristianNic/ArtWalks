const csv = require("csv-parser");
const fs = require("fs");

const results = [];

fs.createReadStream("../COV_data_used/public-art.csv")
	.pipe(csv())
	.on("data", (data) => results.push(data))
	.on("end", () => {
		console.log(results);
		fs.writeFile(
			"../COV_data_processed/csv-json-public-art.json",
			JSON.stringify(results),
			(err) => {
				if (err) throw err;
				console.log("The image JSON has been saved!");
			}
		);
	});
