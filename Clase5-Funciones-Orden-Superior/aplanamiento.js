let arrays = [[1,2,3], [4,5], [6]];

let flattened = arrays.reduce((arr1, arr2) => arr1.concat(arr2));

console.log(flattened);