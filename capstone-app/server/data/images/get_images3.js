const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

function loadData() {
  return fs.readFileSync('../public-art.json', 'utf8');
}

// sample part of JSON file 
// { ... 
// "recordid": "5ea2ceba9f4b2eacf07682d73373f21fd74b96ac",
// "url": "https://covapp.vancouver.ca/PublicArtRegistry/ArtworkDetail.aspx?ArtworkId=672",
// ... }

// I want to make a new JSON file that has only 3 entires per recordid
//
// "recordid": "5ea2ceba9f4b2eacf07682d73373f21fd74b96ac",
// "url": "https://covapp.vancouver.ca/PublicArtRegistry/ArtworkDetail.aspx?ArtworkId=672",
// "photo_url": "https://.....",

const publicArtList = loadData();
const strPulicArtList = JSON.stringify(publicArtList)
const recordid = [];
const imageURLs = [];

function getImageURLs() {
  for (let i = 0; i < strPulicArtList.length; i++) {
    imageURLs.push(
      axios
        .get(strPulicArtList[i].recordid)
        .then(function (response) {
          if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            const img_src = {
              url: $('.ImageWithBorder').attr('src'),
            }
            recordid.push(img_src)
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    ) 
  }
}

getImageURLs()


const url = 'https://covapp.vancouver.ca/PublicArtRegistry/ArtworkDetail.aspx?ArtworkId=706'
// const img_src = []

// const url_list = [
//   'https://covapp.vancouver.ca/PublicArtRegistry/ArtworkDetail.aspx?ArtworkId=707',
//   'https://covapp.vancouver.ca/PublicArtRegistry/ArtworkDetail.aspx?ArtworkId=741',
//   'https://covapp.vancouver.ca/PublicArtRegistry/ArtworkDetail.aspx?ArtworkId=768'
// ]

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

// getImageURL()

// form a list of all the record items for images to look up

// https://stackoverflow.com/questions/56532652/axios-get-then-in-a-for-loop

function makeUrlList() {
  for (let i = 0; i < url_list.length; i++) {

    axios
      .get(url_list[i])
      .then(function (response) {
        if (response.status === 200) {
          const html = response.data;
          const $ = cheerio.load(html);
          // $('.ImageWithBorder');
          const img_src = {
            url: $('.ImageWithBorder').attr('src'),
          }
          const img_list = []

          img_list.push(img_src)


          fs.writeFile('images2.json', JSON.stringify(img_list), (err) => {
            if (err) throw err;
            console.log('Image JSON has been saved!')
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

// makeUrlList()

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