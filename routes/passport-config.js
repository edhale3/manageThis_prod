// const { authenticate } = require('passport')

// const LocalStrategy = require('passport-local').Strategy
// const bcrpyt = require('bcrypt')
// const database = require('../services/db')


// function init(passport){
//     const authenticator = async (email, password, done)=> {
//         const user = await database.query(`select * from accounts where = '${email}'`)
//         if(user == null) {
//             return done(null, false, {message: 'There is no user with that email address'})
//         }

//         try {
//             if(await bcrpyt.compare(password, user.password)){
//                 return done(null, user)
//             } else {
//                 return done(null, false, { message: 'Password is incorrect'})
//             }
//         } catch (e) {
//             return done(e)
//         }

//     }

//     passport.use(new LocalStrategy({usernameField: 'email'}), authenticateUser)
//     passport.serializeUser((user,done)=> { })
//     passport.deserializeUser((id,done)=> { })

// }

// module.exports = init