const passport = require('passport')

function isLoggedIn (req,res,next){
    console.log("this req is pretty cool:", req.user)
    if(req.user){
        next();
    } else {
        console.log("you got here so that's cool")
        res.send(req.isAuthenticated())
    }
  }

module.exports = isLoggedIn