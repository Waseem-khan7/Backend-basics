const express = require("express");
const router = express.Router();

const {
  signUP,
  signIN, 
  handleGetAllUsers,
  handleGetUserById,
} = require("../controllers/auth.controllers");

router.post("/signup", signUP);
router.post("/signin", signIN);
router.get("/", handleGetAllUsers);
router.get("/:id", handleGetUserById);

module.exports = router;
