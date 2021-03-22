const fs = require('fs')

function loadData() {
  return fs.readFileSync("./output4.json", "utf8");
}



async function newJSON() {
  
  const emptyArr = []
  const items = JSON.parse(loadData());

  for (let i = 0; i < items.length; i++) {
    const output = {
      artists: artists,
    }
    emptyArr.push(output)
  }
  fs.writeFile('test.json', JSON.stringify(emptyArr), (err) => {
  if (err) throw err;
  console.log('The image JSON has been saved!')
  });
}

newJSON()
