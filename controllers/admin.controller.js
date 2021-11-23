const User = require('../models/user');
const userDetails = async (req, res, next) => {
    try{
        const user = await User.find();
        if(user){
          res.status(200)
          .json({
            data: user
          })
        }
      }catch(err){
        res.status(400)
        .json({
          error: err.message
        })
      }
}

module.exports ={
  userDetails
}