const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
//const htmlparser2 = require('htmlparser2');

// https://dev.to/aurelkurtula/introduction-to-web-scraping-with-nodejs-9h2
// https://github.com/axios/axios
// GET request for remote image in node.js
// axios({
//   method: 'get',
//   url: 'http://bit.ly/2mTM3nY',
//   responseType: 'stream'
// })
//   .then(function (response) {
//     response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
//   });

// < img class="ImageWithBorder" alt = "" src = "/PublicArtRegistry/_image.aspx/tDMNbF-41qBPcKfm_Ranl4OhUvHl7uSfrpKNRRNvZoE=/Mmissingpiece_vmf.jpg" style = "width:100%;" >

const url = 'https://covapp.vancouver.ca/PublicArtRegistry/ArtworkDetail.aspx?ArtworkId=706'
// const img_src = []

// from the City of Vancouver site, get the url for a given record item
function getImageURL() {
  return axios
    .get(url)
    .then(function (response) {
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
        // $('.ImageWithBorder');
        const img_src = {
          url: $('.ImageWithBorder').attr('src'),
        } 
        // const img_list = 
        fs.writeFile('images.json', JSON.stringify(img_src), (err) => {
          if (err) throw err;
          console.log('The image JSON has been saved!')
        });
      }  
    })
    .catch(function (error) {
    console.log(error);
    });
}

getImageURL()

// form a list of all the record items for images to look up
function makeUrlList() {
  const url_list = []
  // make this list by looking through the entire public-art.json
  return axios
    .get('../public-art.json')
    .then(function (response) {
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
        // $('.ImageWithBorder');
        const img_src = {
          url: $('.ImageWithBorder').attr('src'),
        } 
        // const img_list = 

        fs.writeFile('images.json', JSON.stringify(img_src), (err) => {
          if (err) throw err;
          console.log('Image JSON has been saved!')
        });
      }  
    })
    .catch(function (error) {
    console.log(error);
    });
}

makeUrlList()

// function getImage() {
// }

// getImage()

// function getImages(url) {
//   return axios
//     .get(url, {
//       responseType: 'stream'
//     })
//     .then(function (response) {
//       var img = response.document.getElementByClassName('ImageWithBorder');

//       response.data.pipe(fs.createWriteStream(`${img}.jpg`))
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

// https://cheerio.js.org/module-cheerio_attributes.html#.attr

  // go throught the entire .json and take out id and url
  // then add a third entry called photo_id - the img save name 


  // build an array of each id's url 
  // go to each url 
  // save the photo
  // generate an id that matches the art id
  

// Try getting just one img (then make loop)