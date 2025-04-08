import { useState } from "react";
const Signup = () => {
    var unittypes = ["central" ,"groupement","direction"];
    const [fn, setfn] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [unit, setunit] = useState("");
    const [specify, setspecify] = useState("");
    return ( 
        <div className="signup">
             <input type="text"  placeholder=" FullName"  className="fname" />
             <input type="text"  placeholder="Steg email "  className="se" />
             <input type="password" className="pas" placeholder="Password" />
             <select className="unit">
                 <option value="unit">Select unit type</option>   
                    {unittypes.map((unit) => (
                        <option value={unit} >
                            {unit}
                        </option>
                    ))}
             </select>
             <select className="specify unit">
               select {unit}

             </select>
        </div>
     );
}
 
export default Signup;