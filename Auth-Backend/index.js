const express = require("express");
const userRoutes = require("./routes/auth.routes");

const app = express();
const PORT = 8001;

app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server started at Port: ${PORT}`));
