const reverseArray = function(array) {
    let reverseArray = [];
    for(let i=array.length - 1; i>=0; i--){
        reverseArray.push(array[i]);
    }
    return reverseArray;
}

const reverseArrayInPlace = function (array){
    const arraySize = array.length;
    for(let i=0;i<arraySize/2;i++){
        let tmp = array[i];
        array[i] = array[arraySize-1-i];
        array[arraySize-1-i] = tmp;
    }
};


let myArray = ["A", "B", "C"];
console.log(reverseArray(myArray));
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
