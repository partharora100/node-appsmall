const fs = require("fs");
const http = require("http");
// const path = require("path");
const url = require("url");

// no need to read the data everytime we can just sync read it once in the start and use that data

// readling file in the memory
const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const overviewTemplate = fs.readFileSync(
  `${__dirname}/template/template-overview.html`,
  "utf-8"
);

const productTemplate = fs.readFileSync(
  `${__dirname}/template/template-product.html`,
  "utf-8"
);

const cardTemplate = fs.readFileSync(
  `${__dirname}/template/template-card.html`,
  "utf-8"
);

const replaceTemplate = function (temp, product) {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%FROM%}/g, product.from);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};

//////////////////////////////////////////////
// SERVER
const server = http.createServer((req, res) => {
  const pathName = req.url;
  // Overview Page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(cardTemplate, el))
      .join("");

    const output = overviewTemplate.replace(/{%PRODUCTCARDS%}/g, cardsHtml);
    res.end(output);
  }
  // Product Page
  if (pathName === "/product") {
    res.end("This is the PRODUCT");
  }
  // API
  if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("The server is working");
});
