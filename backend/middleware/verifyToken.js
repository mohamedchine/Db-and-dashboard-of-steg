const {getcentralidbyreportid} = require("../model/central");
const {verifyjwt}=require('../utils/jwtUtils');
const {findUserById}=require('../utils/dbUtils');
const {findreportbyid} = require('../model/report');
const {getCentralsByGroupementId} = require('../model/central')
//middleware that verify accesstoken given to a user this one is global ; 
const verifyToken = async(req,res,next)=>{
    const { Accesstoken } = req.cookies;
    if (!Accesstoken) {
        return res.status(401).json({ message : "no access t"  });
    }
    const payload = verifyjwt(Accesstoken);
    if (!payload) {
        return res.status(401).json({ message : "invalid access t"  });
    }
    const { user, unittype, unitname } = await findUserById(payload.id);
    if(user.is_active ==0 && unittype!=="direction") {
        res.clearCookie('Accesstoken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        
          });
          
        return res.status(403).json({ message : "sorry ur account has been desactivated by the admin  "  })
    };

     if (!user) {
            return res.status(401).json({ message : "we couldnt find u " });
    }
    const { password, ...userr } = user;
    userr.unittype = unittype ;
    userr.unitname = unitname ;  
    req.user = userr ; 
    
    next() ; 
}
//verify central employee const verifyCentralEmployee = async (req, res, next) => {
    const verifyCentralEmployee = async (req, res, next) => {
        
        verifyToken(req, res, async () => {
            if (req.user.unittype !== "central") {
                return res.status(403).json({ message: "You need to be a central employee to do this" });
            }
            
            next();
        });
    };



// verify central employee and his central(hes trying to modify in his central or what )
const verify_centralemployee_and_his_central = (req,res,next)=>{
    
    verifyCentralEmployee(req,res,async()=>{
        if(req.user.central_id == req.params.centralid){
            return next();
        }
        return  res.status(403).json({message : "u are forbiden from doing so"})
    })
} 


//this one check if the user is central employee and if he trying to access his central report only or not ;
const verify_centralemployee_and_his_report =async(req,res,next)=>{
    verifyCentralEmployee(req,res,async()=>{
        
        const centralidbyreportid = await getcentralidbyreportid(req.params.reportid);
        if(centralidbyreportid!=-1 && centralidbyreportid==req.user.central_id ){
            //just to do it in the final route
          const  report =  await findreportbyid(req.params.reportid); 
            
            return next();
        }
        return  res.status(403).json({message : "u are forbiden from doing so"})
    })
  
} 
const verifygroupementemployee = async(req,res,next)=>{
    verifyToken(req,res,async()=>{
       
        if(req.user.unittype!="groupement"){
            return res.status(403).json({message : "u are not a groupement employee"})
            
        }
        const centralids = await getCentralsByGroupementId(req.user.groupement_id);
        req.centralids = centralids ;
        return next();
    })
} ; 


const verifydirectionemployee = async(req,res,next)=>{
    verifyToken(req,res,async()=>{

        if(req.user.unittype!="direction"){
            return res.status(403).json({message : "u are not a direction employee"})

        }
        return next();
    });
}







module.exports = {
   verifyToken ,   verifydirectionemployee , 

   verify_centralemployee_and_his_report,
   verifyCentralEmployee,
   
   verifygroupementemployee,
   verify_centralemployee_and_his_central
}