import fs from "fs/promises";
const filePath = "./content.txt";
export async function addText(text){
    await fs.appendFile(filePath,text+"\n");
}
export async function getContent(){
    try{
        const content=await fs.readFile(filePath,"utf-8");
        return content;
    }catch(error){
        if(error.code==="ENOENT"){
        console.log(`file in path ${filePath} doesnt exist`);
        return "";
        }
        throw error;
    }
}