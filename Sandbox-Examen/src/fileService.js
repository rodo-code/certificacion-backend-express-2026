import fs from "fs/promises"; 

const FILE_PATH = "./content.txt"; 
 
export async function getContent(){ 

    try{ 
        const content = await fs.readFile(FILE_PATH,"utf-8"); 
        console.log("Content retrieved succesfully");
        return content; 
    }catch(error){ 
        console.log("An error has occurred reading the content");
        throw error; 
    } 
} 