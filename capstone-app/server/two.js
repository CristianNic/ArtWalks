// import array2 from './two-data';

const array = [0, 1, 2, 3, 4, 5, 6, 7];

const rows = array.reduce(function (rows, key, index) {
	return (
		(index % 2 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
		rows
	);
}, []);

console.log(rows);

// ---------------------------------------- //

function chunk(collection, size) {
  var result = [];
    
  // default size to two item
  size = parseInt(size) || 2;

  // add each chunk to the result
  for (var x = 0; x < Math.ceil(collection.length / size); x++) {
    var start = x * size;
    var end = start + size;

    result.push(collection.slice(start, end));
  }

  return result;
}

