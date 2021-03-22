const string = "55;56;57;58;238";

const usingSplit = string.split(';');

const cool = parseInt(string)

console.log(usingSplit)
// console.log(cool)


const a = ['1','2','3']

const result = usingSplit.map(function (i) {
  return parseInt(i, 10); 
});

console.log(result);

// const num = 15;
// const n = num.toString();
// console.log(n)

// const num2 = 15;
// const n2 = num2.valueOf();
// console.log(n)

// usingSplit.forEach(element => console.log(element));

// // for each convert to number 
// usingSplit.forEach(function (i) {

//   const digits = toString([i])
//   newObj.push(digits)
//   console.log(newObj)
// });



