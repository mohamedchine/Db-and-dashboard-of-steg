const { getalluserswithcentralid, desactivateuser, activateuser } = require("../../model/users")

const getAllcentralUsersCtrl = async(req,res)=>{
    const users = await getalluserswithcentralid(req.params.centralid)
    //dont retunr the cheff 
    const filteredUsers = users.filter(user => user.id !== req.user.id);
    res.status(200).json({accounts : filteredUsers});
}



const desactivateuserCtrl = async(req,res)=>{
    const usertodesactivateid = req.params.usertodesactivateid;
    await desactivateuser(usertodesactivateid);
    res.status(200).json({message : "user desactivated successfully"});
}


const activateuserCtrl = async(req,res)=>{
    const usertoactivateid = req.params.usertodesactivateid;
    await activateuser(usertoactivateid);
    res.status(200).json({message : "user activated successfully"});
}
module.exports = {
    getAllcentralUsersCtrl,desactivateuserCtrl,activateuserCtrl
}