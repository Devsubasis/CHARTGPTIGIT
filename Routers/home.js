var express = require('express')
var router = express.Router()
//var db = require("../Databases/Database")
router.get('/', (req, res) => {
  res.render("home")
});


module.exports = router;