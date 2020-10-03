const database = require('../services/db');
const Account = {
  async readAll(req, res) {
    try {
      const readAllQuery = 'SELECT * FROM accounts';
      const { rows } = await database.query(readAllQuery);
      return res.send({ rows });
    } catch (error) {
      return res.send(error);
    }
  },
  async validateAccount(req, res){
    try {
      const accountQuery = `select * from accounts where email = '${req}'`;
      const query = await database.query(accountQuery);
      console.log("query", query )
      if(query.rowCount > 0){
        return query
      } else {
        return false
      }
    } catch (error) {
      return res.send(error)
    }
  },
  async validateUserExistence(req,res){
    try {
      const signInQuery = `select * from accounts where email = '${req}'`
      const query = await database.query(signInQuery);
      console.log("new query:", query.rows[0])
      console.log("What is the response? ", res)
      if(query.rows.length > 0){
        return res.send(query)
      } 
    } catch (err){
      console.log("you got here")
      return res.send(err)
    }
  }
};

module.exports = Account;