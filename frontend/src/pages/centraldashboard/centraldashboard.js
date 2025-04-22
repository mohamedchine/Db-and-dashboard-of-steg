import useAuth from "../../context/useAuth";
import axios from "axios";
const CentralDashboard = () => {
    const {user,setuser} = useAuth();
   const handlelogout=async()=>{
       try{
        await axios.post("http://localhost:3004/auth/logout", {}, {
            withCredentials: true
          });
          
        console.log("user before logout",user);    
       }
       catch(err){
           console.log(err);
       }
       finally{
        setuser(null);
        console.log("user after loggin out", user);
       }
    }
    return (
<div className="centraldashboard">
    central
    <button  onClick={handlelogout}>delete</button>
</div>
      );
}

export default CentralDashboard;