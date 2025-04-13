import "./notfound.css";
const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404 Not Found</h1>
           <p>The page you are looking for does not exist.</p>
              <p>Please check the URL or return to the homepage.</p>
                <a href="/welcomepage">Go to Homepage</a>
        </div>
     );
}
 
export default NotFound;