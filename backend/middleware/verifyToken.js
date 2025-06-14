const {getcentralidbyreportid} = require("../model/central");
const {verifyjwt}=require('../utils/jwtUtils');
const {findreportbyid} = require('../model/report');
const {getCentralsByGroupementId} = require('../model/central');
const { findUserByIdAndUnittype, finduserbyemailunittypeunitidinthehr, deleteuseraccountbyidunittype } = require("../utils/dbUtils");
//middleware that verify accesstoken given to a user this one is global ; 
const verifyToken = async(req,res,next)=>{
    const { Accesstoken } = req.cookies;
    if (!Accesstoken) {
        return res.status(401).json({ message : "your session has ended "  });
    }
    const payload = verifyjwt(Accesstoken);
    if (!payload) {
        return res.status(401).json({ message : "invalid access t"  });
    }
    const { user, unittype, unitname } = await findUserByIdAndUnittype(payload.id,payload.unittype);
    //if we didnt find him
    if (!user) {
        return res.status(401).json({ message : "we couldnt find u " });
}
//if we found him we look if hes been desactivated by the admin of the central or not(only work if the user is central employee) 
    if(  unittype!=="direction" && unittype!=="groupement" && user.is_active ==0) {
        res.clearCookie('Accesstoken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        
          });
          
        return res.status(403).json({ message : "sorry ur account has been desactivated by the admin  "  })
    };
    //if not desactivated w check if he is been kicked by the hr or not , if he no longer work in in his central or groupement or direction we delete his account 
    const unitid = user[`${unittype}_id`];
    const useruserexistinthehrdb = await finduserbyemailunittypeunitidinthehr(user.steg_email, unittype, unitid);
    req.user2 = useruserexistinthehrdb;
    if(!useruserexistinthehrdb){
        //delete his fookin accoount then
        await deleteuseraccountbyidunittype(user.id , unittype ,unitid);
        res.clearCookie('Accesstoken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",

          });
          return res.status(401).json({ message: `u have been kicked from our ${unittype} by the hr` });
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
    

    //verify central employee if he is cheff or not 
 


// verify central employee and his central(hes trying to modify in his central or what )
const verify_centralemployee_and_his_central = (req,res,next)=>{
    
    verifyCentralEmployee(req,res,async()=>{
        
        if(req.user.central_id == req.params.centralid){
            return next();
        }
        
        return  res.status(403).json({message : "u are forbiden from doing so"})
    })
} 

const verifycentralemployeeandcheffofcnetral = async(req,res,next)=>{
    verify_centralemployee_and_his_central(req,res,async()=>{
        
        if(req.user2.is_chef==1){
            return next();
        }
        return  res.status(403).json({message : "u are not a cheff of this central"});
    });
}


const verifycentralemployeeandcheffofcnetraland_desactivateduserisfromhiscentral = async(req,res,next)=>{
   //nchoufo est ce que el user hedhaka from nafss el central walla
   const usertodesactivate = findUserByIdAndUnittype(req.params.usertodesactivateid,"central");
   if(!usertodesactivate){
    return  res.status(400).json({message : "this user already desactivated"});}
    verify_centralemployee_and_his_central(req,res,async()=>{
        if(usertodesactivate.central_id!=req.user.central_id){
            return  res.status(403).json({message : "this user is not from your central, u can't desactivate him"});
        }
    })
    return next();
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




const verifymodificationismeantforhim = async(req,res,next)=>{
     if(req.modification.receiver_groupement_id != req.user.groupement_id){
        return res.status(403).json({message : "this modification is not meant for you"})
     }
     return next();
}


module.exports = {verifycentralemployeeandcheffofcnetral ,
    verifymodificationismeantforhim,
   verifyToken ,   verifydirectionemployee , 

   verify_centralemployee_and_his_report,
   verifyCentralEmployee,
   
   verifygroupementemployee,
   verify_centralemployee_and_his_central,verifycentralemployeeandcheffofcnetraland_desactivateduserisfromhiscentral
}