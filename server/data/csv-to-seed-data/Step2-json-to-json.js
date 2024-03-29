const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

function loadData() {
	return fs.readFileSync("../COV_data_processed/csv-json-public-art.json", "utf8");
}

// <div> extracting id from 
// <div id="LiverpoolTheme_wt74_block_wtMainContent_WebPatterns_wt165_block_wtTitle_WebPatterns_wtWebScreenTitleDesktop_block_wtContent" class="PH_Preview PH">Finger Paint</div>
const id =
	"LiverpoolTheme_wt74_block_wtMainContent_WebPatterns_wt165_block_wtTitle_WebPatterns_wtWebScreenTitleDesktop_block_wtContent";
const publicArt = JSON.parse(loadData());

async function getArtWorkTitle(url) {
	return axios
		.get(url)
		.then(function (response) {
			if (response.status === 200) {
				const html = response.data;
				const $ = cheerio.load(html);
				const title = $(`#${id}`).text();
				return title;
			}
		})
		.catch(function (error) {
			console.log(error);
		});
}

async function getOneImageURL(url) {
	return axios
		.get(url)
		.then(function (response) {
			if (response.status === 200) {
				const html = response.data;
				const $ = cheerio.load(html);
				const photo_url = $(".ImageWithBorder").attr("src");
				return photo_url;
			}
		})
		.catch(function (error) {
			console.log(error);
		});
}

async function compileJSON() {
	const emptyArr = [];
	console.log("Getting titles & photo_urls");
	console.log(publicArt[0].geom);
	for (let i = 0; i < publicArt.length; i++) {
		console.log("Inside for loop " + [i + 1]);
		const title = await getArtWorkTitle(publicArt[i].url);
		const photo_url_jpg = await getOneImageURL(publicArt[i].url);
		const output = {
			registry_id: parseInt(publicArt[i].registryID),
			title: title.toString(),
			artists_id: parseInt(publicArt[i].artists),
			artists_names: publicArt[i].artists_names,
			artist_statement: publicArt[i].artist_project_statement,
			type: publicArt[i].type,
			status: publicArt[i].status,
			site_name: publicArt[i].site_name,
			address: publicArt[i].address,
			primary_material: publicArt[i].primary_material,
			url: publicArt[i].url,
			photo_url: publicArt[i].photo_URL,
			photo_url_jpg: "https://covapp.vancouver.ca" + photo_url_jpg.toString(),
			ownership: publicArt[i].ownership,
			neighbourhood: publicArt[i].neighbourhood,
			lat: JSON.parse(publicArt[i].geom).coordinates[1],
			lon: JSON.parse(publicArt[i].geom).coordinates[0],
			geo_local_area: publicArt[i].geo_local_area,
			work_description: publicArt[i].work_description,
			photo_credits: publicArt[i].photo_credits,
			installation_year: parseInt(publicArt[i].installation_year),
		};
		emptyArr.push(output);
	}
	fs.writeFile(
		"../COV_data_processed/art_work_seed_data.js",
		JSON.stringify(emptyArr),
		(err) => {
			if (err) throw err;
			console.log("The JSON has been saved!");
		}
	);
}

compileJSON();
