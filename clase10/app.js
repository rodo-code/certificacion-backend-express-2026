import { addText, getContent, updateLine, deleteLine } from "./fileService.js";
import http from "http";
import randomItem from "random-item";

const PORT = 3000;

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  let urlParameters = req.url.split("/");
  if(req.method === "GET" && req.url === "/random-word"){
    const content = await getContent();
   const lines = content.split(/\r?\n/).filter(Boolean);
    if(lines.length===0){
      res.statusCode = 404;
      res.end(JSON.stringify({
        error: "File is empty"
      }));
      return;
    }
    const randomLine = randomItem(lines);
    res.statusCode = 200;
    res.end(JSON.stringify({ content: randomLine }));
      return;
  }

  if (req.method === "GET" && req.url === "/words") {
    const content = await getContent();
    res.statusCode = 200;
    res.end(JSON.stringify({ content }));
    return;
  }
  if (req.method === "GET" && urlParameters[1] === "words" && urlParameters[2]) {
  const line=Number(urlParameters[2]);
  if (!Number.isInteger(line) || line <= 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({
        error: "line must be a positive integer"
      }));
      return;
    }
  const content = await getContent();
  const lines = content.split("\n");
  if (lines.length>0 && lines[lines.length-1]===""){
    lines.pop();
  }
  if (line > lines.length) {
      res.statusCode = 404;
      res.end(JSON.stringify({
        error: "Line not found"
      }));
      return;
    }
    res.statusCode = 200;
    res.end(JSON.stringify({
      line,content: lines[line - 1]
    }));
    return;
  }

  if (req.method === "POST" && req.url === "/words") {
    const body = await readBody(req);
    await addText(body.word);
    res.statusCode = 200;
    res.end(JSON.stringify({
      message: `The word ${body.word} was added to the file`
    }));
    return;
  }
  if(req.method === "PATCH" && urlParameters[1] === "words" && urlParameters[2]){
    const line=Number(urlParameters[2]);
    if (!Number.isInteger(line) || line <= 0) {
     res.statusCode = 400;
     res.end(JSON.stringify({
      error: "line must be a positive integer"
     }));
     return;
    }
    const content= await getContent();
    const lines= content.split("\n");
    if(line> lines.length){
      res.statusCode = 404;
      res.end(JSON.stringify({
        error: "Line not found"
      }));
      return;
    }
    res.statusCode = 200;
    const body = await readBody(req);
    await updateLine(line, body.word);
    res.end(JSON.stringify({
      message: `The line ${line} was updated with the word ${body.word}`
    }));
    return;
  }
  if(req.method === "DELETE" && urlParameters[1] === "words" && urlParameters[2]){
    const line=Number(urlParameters[2]);

    if(line<=0 || !Number.isInteger(line)){
    res.statusCode=400;
    res.end(JSON.stringify({
      error: "line must be a positive integer"
    }));
    return;
    }

    const content= await getContent();
    const lines= content.split("\n");
    if (lines.length > 0 && lines[lines.length - 1] === "") {
    lines.pop();
    }
    if(line> lines.length){
    res.statusCode=404;
    res.end(JSON.stringify({
      error: "Line not found"
    }));
    return;
    }
    res.statusCode=200;
    await deleteLine(line);
    res.end(JSON.stringify({
      message: `The line ${line} was deleted`
    }));
    return;
  }
  res.statusCode = 404;
  res.end(JSON.stringify({
    error: "Not method to handle the url"
  }));
});

server.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);

});