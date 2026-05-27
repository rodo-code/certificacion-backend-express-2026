import express from "express";

const app = express();

const PORT = 3000;

app.get("/",(req,res)=>{
    res.send("<h1>HELLO FROM EXPRESS.JS RENOVATED</h1> <h3>By Rodolfo Catunta</h3>")
})

app.listen(PORT, () => {
    console.log("Hello from express");
});