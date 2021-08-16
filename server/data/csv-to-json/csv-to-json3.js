const csv = require('csv-parser')
const fs = require('fs')


const results = [];

fs.createReadStream('public-art-edited-377d.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    fs.writeFile('csv-json-public-art-d.json', JSON.stringify(results), (err) => {
    if (err) throw err;
    console.log('The image JSON has been saved!')
      });

    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });




  

