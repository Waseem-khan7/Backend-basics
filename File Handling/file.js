const fs = require("fs");

// fs.writeFileSync("./test.txt","Hii Waseem")

// fs.writeFile("./text.txt", "Hii Waseem, This is ASYNC file", () => {});

// const result = fs.readFileSync("./test.txt", "utf-8");
// console.log(result);

fs.readFile("./text.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

// fs.appendFileSync("./test.txt", `${Date.now()}Hi This will be append\n`);

// fs.appendFile("./text.txt", "Hi this should be append in async file", () => {});

// fs.cpSync("./test.txt", "./copy.txt");

// fs.unlinkSync("./copy.txt");

// fs.mkdir("./contacts.txt");

// console.log(fs.statSync("./test.txt"));
