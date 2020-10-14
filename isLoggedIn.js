const passport = require('passport')

//if user is logged in then continue the route, 
//otherwise return to the front end that it needs authentication
function isLoggedIn (req,res,next){
    if(req.user){
        next();
    } else {
        res.send(req.isAuthenticated())
    }
  }

module.exports = isLoggedIn