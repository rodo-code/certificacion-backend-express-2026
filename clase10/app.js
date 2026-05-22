console.log("hola bola");
import {addText,getContent} from "./fileService.js";

async function main(){
    await addText("hola bola");
    const filecontent=await getContent();
    console.log(filecontent);
}
main();