const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()} : ${req.method} ${req.url} New request recieved\n`;

  const myUrl = url.parse(req.url, true);

  fs.appendFile("log.txt", log, () => {
    switch (myUrl.pathname) {
      case "/":
        if (req.method === "GET") res.end("This is Home Page");
        break;
      case "/about":
        const username = myUrl.query.name;
        // const qp = res.end("Hi this is about page");
        res.end(`Hi, ${username}`);
        break;
      case "/contact-us":
        res.end("I'm Waseem you can contact me here");
        break;
      case "/signup":
        if (req.method === "GET") {
          res.end("This is a SignUp Form");
        } else if (req.method === "POST") {
          // some DB Query
          res.end("Success");
        }
      default:
        res.end("404 not found");
    }
  });
});

myServer.listen(8000, () => {
  console.log("Server Started");
});
