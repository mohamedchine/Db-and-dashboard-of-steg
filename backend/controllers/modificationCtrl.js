const { findcentralbyid } = require("../model/central");
const { getperformancebyid } = require("../model/performance");
const { addModificationRequest, getModificationRequestsByRecordId, getModificationRequestById, getModificationRequestsByGroupement, deleteModificationRequest } = require("../model/requestmodification");
const { whatsmethode } = require("../utils/getmethodebyrequestmodification");
const { validateperformancefortherequest } = require("../utils/perofrmanceValidation");
const { runmodification } = require("../utils/requestmodificationUtils");
const requestmodificationCtrl = async (req, res) => {
    // Extract data from request body
    let {
        table_name,
        record_id,
        old_value,
        new_value,
        raison,
    } = req.body;
    const requester = req.user;

    // Handle performance table special case
    const method = whatsmethode({table_name , new_value})

    if(table_name == "performance"){
        
        if(method =="update"){
            const performance = await getperformancebyid(record_id);
            old_value = performance;
        }   
        if(method =="insert"){
            old_value=null ; 
            record_id=-6;
            
        }
    }
    const central = await findcentralbyid(requester.central_id);

    const receiver_groupement_id = central.groupement_id;

    const data = {
        method,
        table_name,
        record_id,
        old_value,
        new_value,
        raison,
        requester,  // Don't stringify here
        receiver_groupement_id
    };

    // Check for existing modification requests
    let modificationRequest=null;
    //if we have no performance in that date so we gotta look for modification request for that turbine in that date
    if(table_name == "performance" &&  method =="insert"  ){
        //we dont have record id in this case
        const {turbineid , performance_date,centralid} = req.new_value ;
         modificationRequest =await getModificationRequestByPerformanceDateAndCentralId(performance_date,centralid,turbineid);
    }else{
         modificationRequest = await getModificationRequestsByRecordId(record_id);
    }
    
    if (modificationRequest && modificationRequest.length > 0) {
        return res.status(401).json({
            message: `${requester.steg_email} has already requested a modification at ${modificationRequest[0].created_at}. Wait for the groupement employee to accept or refuse it before requesting another one.`
        });
    }

    // Insert new modification request
    const result = await addModificationRequest(data);

    // Get the full modification request by its new ID
    const newRequest = await getModificationRequestById(result.id);

    return res.status(201).json({
        message: "Modification request has been sent to the groupement. Wait for it to be accepted before requesting another modification.",
        request: newRequest
    });
};










const getAllModificationRequestsCtrl = async (req, res) => {
    try {
        const groupementId = req.user.groupement_id;
        const modificationRequests = await getModificationRequestsByGroupement(groupementId);
        
        // Enhance each request with a formatted action description
        const enhancedRequests = modificationRequests.map(request => {
            // Create a descriptive action message
            let actionDescription = '';
            switch(request.method) {
                case 'update':
                    actionDescription = `wants to update a record in ${request.table_name}`;
                    break;
                case 'delete':
                    actionDescription = `wants to delete a record from ${request.table_name}`;
                    break;
                case 'insert':
                    actionDescription = `wants to insert a new record in ${request.table_name}`;
                    break;
                default:
                    actionDescription = `requested a modification in ${request.table_name}`;
            }
            
            return {
                ...request,
                actionDescription
            };
        });
        
        return res.status(200).json({
            message: "Modification requests retrieved successfully",
            modificationRequests: enhancedRequests
        });
    } catch (error) {
        console.error("Error fetching modification requests:", error);
        return res.status(500).json({
            message: "Failed to retrieve modification requests",
            error: error.message
        });
    }
};







const acceptModificationRequestCtrl = async(req,res)=>{
    const modification = req.modification ; 
    await runmodification(modification);
    await deleteModificationRequest(modification.id);
    return res.status(200).json({
        message: "Modification request has been accepted successfully",
    });
    


}
module.exports = {requestmodificationCtrl,getAllModificationRequestsCtrl,acceptModificationRequestCtrl};