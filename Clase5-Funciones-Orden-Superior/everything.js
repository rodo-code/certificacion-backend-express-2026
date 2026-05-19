function every(array, test){
    let countPassTest = 0;
    for(let element of array){
        if(test(element)){
            countPassTest++;
        }
    }
    return countPassTest == array.length;
}

function everyV2(array, test){
    return !array.some((element) => !test(element) );
}

console.log(everyV2([1, 3, 5], n => n < 10));
// → true
console.log(everyV2([2, 4, 16], n => n < 10));
// → false
console.log(everyV2([], n => n < 10));
// → true