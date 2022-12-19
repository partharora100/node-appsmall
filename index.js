const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");

const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const dataobj = JSON.parse(data);

//////////////////////////////////////////////
// SERVER
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  }

  if (pathName === "/product") {
    res.end("This is the PRODUCT");
  }

  if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("The server is working");
});
