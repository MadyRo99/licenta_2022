let express = require('express')
let router = express.Router()

const { authJwt } = require("../middleware")
const authController = require("../controllers/AuthenticationController")

/* GET users listing. */
router.post('/signup', function(req, res, next) {
  authController.signup(req).then((response) => {
    console.log(response)
    res.json(response)
  })
});

module.exports = router;
