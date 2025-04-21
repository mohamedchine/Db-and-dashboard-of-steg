import useAuth from "../context/useAuth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
const PersistingLogin = () => {
    const {user,setuser} = useAuth();
    const [isloading,setisloading] = useState(true);
    useEffect(()=>{
        const fetchData = async()=>{
            try{          
                const result = await axios.get("http://localhost:3004/auth/check" ,{withCredentials:true});
                 setuser((prev)=>{
                   
                    return result.data.user ;  //check the backend if u want to know why i did it like this
                 })
            }
        catch(err){
            console.log(err);
        }
        finally{
            setisloading(false);
        }
        }
         user ?  setisloading(false): fetchData();
    },[])



    return (
        <>
        {!isloading ? <Outlet/> : <p>loading..</p>}
        </>
     );
}
 
export default PersistingLogin;