import "./notfound.css";
import { useNavigate } from "react-router-dom"; 

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found">
            <h1>404 Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <p>Please check the URL or return to the homepage.</p>
            <button onClick={() => navigate(-1,{replace:true})}>Go back</button> 
        </div>
    );
}

export default NotFound;