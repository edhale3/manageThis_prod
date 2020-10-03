const SignUp = require('../SQLQueries/SignUpQuery');
const { validateUser } = require('../validators/signup');

exports.get_signup= async (req, res) => {
    let errors = {};
    console.log("here i am")
    return validateUser(errors, req).then(errors => {
        if(!isEmpty(errors)){
            console.log(errors)
        } else {
            const newUser = SignUp.signUpPost(req.body).then(result => res.send("Good Job"))
            return newUser
        }
    })
    // return SignUp.signUpPost(req.body).then(result =>  res.send("Good Job"))
}

exports.get_accounts= (req,res) => { res.send("Congrats you made it to the accounts page")}