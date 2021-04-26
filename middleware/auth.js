const jwt = require('jsonwebtoken')
const User = require('../model/account.model')

const auth = async (req,res,next) => {
      try {
          const token = req.header('Authorization').replace('Bearer ' , '')
          const decoded = jwt.verify(token, 'giladbank2021')
          const user = await User.findOne({passport : decoded.passport, 'tokens.token' : token})

          if(!user) {
              throw new Error('Please authenticate')
          }
          
          next()
      }
      catch {
          res.status(401).send({erroer: 'Please authenticate'})
      }
  
}

module.exports = auth