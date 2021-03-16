

const fs = require('fs');
const axios = require('axios');

const array = [{ id: 'asdf' }, { id: 'foo' }, { id: 'bar' }]; // changed the input array a bit so that the `array[i].id` would actually work - obviously the asker's true array is more than some contrived strings
let users = [];
let promises = [];
for (i = 0; i < array.length; i++) {
  promises.push(
    axios
      .get('/user/' + array[i].id)
      .then(response => {
      // do something with response
      users.push(response);
    })
  )
}

Promise.all(promises).then(() => console.log(users));