var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.sendFile(__dirname + "/" + "/phong1.html");
});

module.exports = router;
