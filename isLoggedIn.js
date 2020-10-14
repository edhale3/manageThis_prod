const passport = require('passport')

function isLoggedIn (req,res,next){
    if(req.user){
        next();
    } else {
        res.send(req.isAuthenticated())
    }
  }

module.exports = isLoggedIn