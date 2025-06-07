import { useEffect, useState } from "react";
import "./signup.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
        var unittypes = ["central" ,"groupement","direction"];
        const [centrals ,setcentrals] = useState(null);
        const [groups , setgroups] = useState(null);
        const [fn, setfn] = useState("");
        const [email, setemail] = useState("");
        const [password, setpassword] = useState("");
        const [unit, setunit] = useState("");
        const [unitid, setunitid] = useState(null);
        const [showspecify , setshowspecify]=useState(false) ; 
        const [loading ,setloading] = useState(false);   
// to put the centralid in the specify 
    const handleonchangespecify = (e)=>{
        if(e.target.value=="default"){
            setunitid(null);
        }
        else{
            setunitid(e.target.value);
        }
    
    }

    //show or hide the select {unit}
    const handlesomeanimation = (e)=>{
        setunitid(null);  //change it to null when we change the unit type
        if(e.target.value=="unit-default" || e.target.value=="direction"){
            setshowspecify(false)
            setunit("");
        }
        else{
            setunit(e.target.value);
            setshowspecify(true)
        }
    }

    //fetch units from server
    useEffect(() => {
         const fetchunits = async()=>{
            const response = await axios.get("http://localhost:3004/units/");
          setcentrals(response.data.centrals);
            setgroups(response.data.groups);
         }
         fetchunits();
    },[]);
    
    //do the actual registration
    const handleRegister = async()=>{
        setloading(true);
            const user = {
                fullname: fn,
                steg_email: email,
                password: password,
                unit: unit,
                unitid: unitid
            }
           
            try{
                const response  = await axios.post("http://localhost:3004/auth/register",user,  {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }) ;
                 toast.success(response.data.message);
            }catch(e){
                
                toast.error( e.response.data.message);
            }
            setloading(false)
    }
    return ( 
        <div className="signup">
            <div className="container">
             <input type="text"  placeholder=" FullName"  className="fname" value = {fn} onChange={(e)=>setfn(e.target.value)} />
             <input type="text"  placeholder="Steg email "  className="se"  value = {email} onChange={(e)=>setemail(e.target.value)} />
             <input type="password" className="pas" placeholder="Password"  value = {password} onChange={(e)=>setpassword(e.target.value)} />
             <select className="unit" onChange={(e) => handlesomeanimation(e)}>
                 <option value="unit-default">Select unit type</option>   
                    {unittypes.map((unit) => (
                        <option value={unit} >
                            {unit}
                        </option>
                    ))}
             </select>
             {showspecify && <select className="specify unit" onChange={(e)=> {handleonchangespecify(e)}} >
               <option value="default">select {unit}</option>
                 {unit=="central" && centrals.map((central) => (
                        <option value={central.central_id} >
                            {central.name}
                        </option>
                    ))}
                    
                 {unit=="groupement" && groups.map((group) => (
                        <option value={group.groupement_id} >
                            {group.name}
                        </option>
                    ))}
                        
             </select>}
             <button  onClick={()=>handleRegister()} className="register"  disabled={loading} > {loading? "loading .. " : "Register"} </button>
             </div>
            
        </div>
     );
}
 
export default Signup;