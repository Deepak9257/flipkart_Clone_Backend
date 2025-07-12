const jwt = require("jsonwebtoken");
const MyError = require("./error");

const generateJwt = (user) =>{

    if(!user) throw new MyError(400, "please provide data to generate token")

    let payload = {};
    
        if(typeof user === 'object'){
           payload = {
                id:user._id,
                name:user.name,
                email:user.email,
            }
        } else {
             payload = {user}
          
        }

     const token = jwt.sign(payload, process.env.JWT_KEY);
    
     return token;
  
}

module.exports = {generateJwt}