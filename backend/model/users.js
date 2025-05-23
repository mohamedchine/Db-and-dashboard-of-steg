const db = require('../config/db');

const getalluserwithunit = async () => {
    try {
        // Get all central units
        const [centrals] = await db.execute(`
            SELECT central_id, name 
            FROM central 
            ORDER BY name
        `);

        // Get all users from central units (include id)
        const [centralUsers] = await db.execute(`
            SELECT id, fullname, steg_email, is_active, central_id
            FROM central_accounts
            ORDER BY fullname
        `);

        // Get all groupement units
        const [groupements] = await db.execute(`
            SELECT groupement_id, name 
            FROM groupement 
            ORDER BY name
        `);

        // Get all users from groupement units (include id)
        const [groupementUsers] = await db.execute(`
            SELECT id, fullname, steg_email, IFNULL(is_active, 1) as is_active, groupement_id
            FROM groupement_accounts
            ORDER BY fullname
        `);

        // Build the response structure with active and inactive sections
        const response = {
            active: {
                centrals: [],
                groupements: []
            },
            inactive: {
                centrals: [],
                groupements: []
            }
        };

        // Process central units
        centrals.forEach(central => {
            const activeUsers = centralUsers
                .filter(user => user.central_id === central.central_id && user.is_active === 1)
                .map(user => ({
                    id: user.id,
                    fullname: user.fullname,
                    steg_email: user.steg_email
                }));

            const inactiveUsers = centralUsers
                .filter(user => user.central_id === central.central_id && user.is_active === 0)
                .map(user => ({
                    id: user.id,
                    fullname: user.fullname,
                    steg_email: user.steg_email
                }));

            if (activeUsers.length > 0) {
                response.active.centrals.push({
                    name: central.name,
                    users: activeUsers
                });
            }

            if (inactiveUsers.length > 0) {
                response.inactive.centrals.push({
                    name: central.name,
                    users: inactiveUsers
                });
            }
        });

        // Process groupement units
        groupements.forEach(groupement => {
            const activeUsers = groupementUsers
                .filter(user => user.groupement_id === groupement.groupement_id && user.is_active === 1)
                .map(user => ({
                    id: user.id,
                    fullname: user.fullname,
                    steg_email: user.steg_email
                }));

            const inactiveUsers = groupementUsers
                .filter(user => user.groupement_id === groupement.groupement_id && user.is_active === 0)
                .map(user => ({
                    id: user.id,
                    fullname: user.fullname,
                    steg_email: user.steg_email
                }));

            if (activeUsers.length > 0) {
                response.active.groupements.push({
                    name: groupement.name,
                    users: activeUsers
                });
            }

            if (inactiveUsers.length > 0) {
                response.inactive.groupements.push({
                    name: groupement.name,
                    users: inactiveUsers
                });
            }
        });

        return response;

    } catch (error) {
        console.error("Error retrieving users with units:", error);
        throw error;
    }
};

// Add this helper function to your exports
const updateuserstatus = async (id, unittype, isActive) => {
    try {
      await db.execute(
        `UPDATE ${unittype}_accounts SET is_active = ? WHERE id = ?`,
        [isActive, id]
      );
      return true;
    } catch (error) {
      console.error(`Error updating user status: ${error}`);
      throw error;
    }
  };




  const getalluserswithcentralid = async(centralId)=>{
    try {
     
        const [users]=await db.execute('select fullname ,steg_email,id,is_active from central_accounts where central_id = ? ',[centralId])
           return users;



    }
   catch(e){
    console.log(e.message);
   }
  }


  const desactivateuser = async(id)=>{
    await db.execute('update central_accounts set is_active = 0 where id = ?',[id]);
    
  }
  const activateuser = async(id)=>{
    await db.execute('update central_accounts set is_active = 1 where id = ?',[id]);
    
  }
module.exports = {
    getalluserwithunit,updateuserstatus,getalluserswithcentralid,desactivateuser,activateuser
};
