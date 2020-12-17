const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello DevTest, I am working well");
});

module.exports = router;
