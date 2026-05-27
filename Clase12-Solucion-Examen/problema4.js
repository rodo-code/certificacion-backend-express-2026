import { getContent } from "./fileService.js";
import http from "http";

const PORT = 3000;

const server = http.createServer(async (req,res) => {
    res.setHeader("Content-Type","application/json");
    if(req.method == "GET" && req.url == '/content'){
        try{
            const content = await getContent();
            res.statusCode = 200;
            res.end(JSON.stringify({
                content
            }));
        }catch(error){
            res.statusCode = 500;
            res.end(JSON.stringify({
                error
            }));
        }
        return;
    }
    res.statusCode = 404;
    res.end(JSON.stringify({
        "error": "url not available"
    }));
});

server.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);
});
