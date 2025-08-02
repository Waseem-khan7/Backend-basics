const express = require("express");
require("dotenv").config();
const urlRoute = require("./routes/url");
const authRoute = require("./routes/auth.routes");
const { connectToMongoDB } = require("./connect");

const app = express();
const PORT = process.env.PORT || 8002;

connectToMongoDB(process.env.Mongo_URI).then(() =>
  console.log("MongoDB Connected")
);

app.use(express.json());
app.use("/auth", authRoute);
app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
