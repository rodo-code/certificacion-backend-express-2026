function countCharacters(character) {
    return (text) => {
        let count = 0;
        for(let i = 0; i < text.length; i++){
            if (text[i] === character){
                count++;
            }
        }
        return count;
    };
}

const countBs = countCharacters("B");

console.log(countBs("BBC"));
console.log(countBs("abc"));