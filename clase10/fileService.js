import fs from "fs/promises";

const FILE_PATH = "./content.txt";

export async function addText(text){
    await fs.appendFile(FILE_PATH,text+"\n");
}

export async function getContent(){
    try{
        const content = await fs.readFile(FILE_PATH,"utf-8");
        return content;
    }catch(error){
        if(error.code === "ENOENT"){
            console.log(`File in path ${FILE_PATH} does not exist`);
            return "";
        }
        throw error;
    }
}
export async function updateLine(lineNumber, newWord) {
  const content = await getContent();
  const lines = content.split("\n");
  if (lines.length > 0 && lines[lines.length - 1] === "") {
    lines.pop();
  }
  lines[lineNumber - 1] = newWord;

  await fs.writeFile(FILE_PATH, lines.join("\n") + "\n");
}
export async function deleteLine(lineNumber) {
  const content = await getContent();
  const lines = content.split("\n");
  if (lines.length > 0 && lines[lines.length - 1] === "") {
    lines.pop();
  }
  lines.splice(lineNumber - 1, 1);

  await fs.writeFile(FILE_PATH, lines.join("\n") + (lines.length > 0 ? "\n" : ""));
}