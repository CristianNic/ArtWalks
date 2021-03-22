const csv = require('csv-parser')
const fs = require('fs')


const results = [];

fs.createReadStream('public-art-artists-a.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    fs.writeFile('csv-json-artists.json', JSON.stringify(results), (err) => {
    if (err) throw err;
    console.log('The image JSON has been saved!')
      });


    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });




  

