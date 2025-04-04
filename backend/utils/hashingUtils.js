const bcrypt =require('bcrypt') ; 
   


const hashPassword = async(password)=>{
    const hashedpassword = await bcrypt.hash(password,10);
    return hashedpassword ; 
   }



const comparepassword = async(hashp,normalp)=>{
    const match = await bcrypt.compare(normalp,hashp) ; 
    return match ; 
   }
module.exports ={ comparepassword,hashPassword}