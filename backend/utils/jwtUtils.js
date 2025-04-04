const jwt = require('jsonwebtoken');
const genjwt = (payload ,expires)=>{
    const token = jwt.sign(payload, process.env.jwtsecret ,{expiresIn:expires}  ); //payload secret for the hash and expires at
    return token ;  
}
const verifyjwt = (token )=>{
    try{
        return jwt.verify(token , process.env.jwtsecret); //returns the token payload if valid
    } 
    catch(err){
        return false ; 
    }
}
module.exports = {genjwt , verifyjwt}