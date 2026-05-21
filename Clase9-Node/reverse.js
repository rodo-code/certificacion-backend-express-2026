export function reverse(string) {
    let reversedString= "";
    try{
        reversedString = Array.from(string).reverse().join("");
    }catch(error){
        console.log("An error has ocurred when reversing string");
    }
  return reversedString;
}