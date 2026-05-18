const isEven = (N) => {
    if (N === 0){
        return true;
    }
    if (N === 1){
        return false;
    }
    if (N<0) {
        return isEven(-N);
    }
    return isEven(N - 2);
};

console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(-1));