const fs = require("fs").promises;
const path = require("path");

const USERS = path.join(__dirname, "../users.json");

//SignUP
async function signUP(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ err: "Email and Password required" });
  }

  const data = await fs.readFile(USERS, "utf-8");
  const users = JSON.parse(data);

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ err: "User already exists" });
  }

  const newUser = {
    id: users.length + 1,
    email,
    password,
  };
  users.push(newUser);

  await fs.writeFile(USERS, JSON.stringify(users));

  return res.status(201).json({ message: "User Registered", user: newUser });
}

//SignIN
async function signIN(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password required" });
  }

  const data = await fs.readFile(USERS, "utf-8");
  const users = JSON.parse(data);

  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  return res.status(200).json({ message: "Login Successfully", user });
}

//get all users
async function handleGetAllUsers(req, res) {
  try {
    const data = await fs.readFile(USERS, "utf-8");
    const users = JSON.parse(data);

    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Failed to read the user", error: error.message });
  }
}

//get user with id
async function handleGetUserById(req, res) {
  const id = Number(req.params.id);

  const data = await fs.readFile(USERS, "utf-8");
  const users = JSON.parse(data);

  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(400).json({ err: "User not found" });
  }
  return res.status(200).json(user);
}

module.exports = {
  signUP,
  signIN,
  handleGetAllUsers,
  handleGetUserById,
};
