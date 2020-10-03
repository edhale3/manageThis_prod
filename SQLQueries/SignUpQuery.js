const database = require('../services/db')
const bcrypt = require('bcrypt')

const SignUp = {
    async signUpPost(req, res){
        console.log("this is a req:", req)

        const generateHash = function(password){
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
        }
        
        const hashedPassword = generateHash(req.password)
        try {
            const signUpQuery = `insert into accounts (first_name, last_name, email, gender, password) values ('${req.first_name}','${req.last_name}', '${req.email}', '${req.gender}', '${hashedPassword}')`
            const result = await database.query(signUpQuery)
            return req
        } catch (error) {
            return console.log("Failure:", error)
        }
    }
}

module.exports = SignUp;