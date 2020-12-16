const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(".--->", router);
  res.send("Hello DevTest, I am working well");
});

module.exports = router;
