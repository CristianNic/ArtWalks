// const csv = require('csvtojson');
// const csvFilePath = './public-art-edited-377.csv'

// async () => {
  //   const jsonObj = await csv().fromFile(csvFilePath)
  //   console.log(jsonObj);
  //   fs.writeFile('output2.json', jsonObj), (err) => {
    //   if (err) throw err;
    //   console.log('The image JSON has been saved!')
    //   };
    // };
    
// const fs = require('fs');
// csv = fs.readFileSync("public-art-edited-377.csv") 

// //var csv is the CSV file with headers
// function csvJSON(csv){
//   const lines=csv.split("\n");
//   const result = [];
//   const headers=lines[0].split(",");
//   for(var i=1;i<lines.length;i++){
//       var obj = {};
//       var currentline=lines[i].split(",");
//       for(var j=0;j<headers.length;j++){
//           obj[headers[j]] = currentline[j];
//       }
//       result.push(obj);
//   }
//   //return result; //JavaScript object
//   return JSON.stringify(result); //JSON
// }

// csvJSON(csv)

const fs = require('fs');
csv = fs.readFileSync("public-art-edited-377.csv") 

let out = {}
// let csv = `0   -8,396  13,414  -35,891 39,22489124
// 1   -8,789  12,768  -35,891 39,09516883
// 2   -9,136  12,768  -35,891 39,17463722
// 3   -9,614  12,768  -35,891 39,2888623
// 4   -9,614  12,397  -36,282 39,52844709
// 5   -9,614  12,397  -36,282 39,52844709`;

csv.split(/\n/).map(l=> {[n,...a]=l.split(/ +/),out[n]=a.map(x=>+x.replace(',','.'))});

console.log(JSON.stringify(out, 0, 4));




