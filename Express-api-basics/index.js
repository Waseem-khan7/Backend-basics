const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//Middleware - (BuiltIn)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}: ${req.method}: ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

//Routes
app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users
    .map((user) => `<li>${user.first_name} </li><li>${user.last_name}</li>`)
    .join("")}
  </ul>
  `;
  res.send(html);
});

//Rest APIs
app.get("/api/users", (req, res) => {
  console.log(req.headers);
  // res.setHeader("x-myName", "Waseem Khan")
  return res.json(users);
});

app
  .route("/api/users/:id")

  // get the user of unique id
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  })

  // edit user with id
  .patch((req, res) => {
    const id = Number(req.params.id);
    const updates = req.body;

    const index = users.findIndex((user) => user.id === id);
    if (index == -1) {
      return res.status(404).json({ status: "user not found" });
    }
    users[index] = { ...users[index], ...updates };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.status(500).json({ status: "Failed to update the file" });
      }
      return res.json({ status: "User Updated", user: users[index] });
    });
  })

  // delete user with id
  .delete((req, res) => {
    const id = Number(req.params.id);
    const updatedData = users.filter((user) => user.id !== id);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(updatedData), (err) => {
      if (err) {
        return res.status(500).json({ status: "Failed to delete data" });
      }
      return res.json({ status: "Success", id: id });
    });
  });

// create a user
app.post("/api/users", (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    res.status(400).json({ msg: "All fields are req..." });
  }
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      res.status(404).json({ status: "failed to write the data" });
    }
    return res.status(201).json({ status: "Success", id: users.length });
  });
});

app.listen(PORT, () => console.log(`Server started at Port ${PORT}`));
