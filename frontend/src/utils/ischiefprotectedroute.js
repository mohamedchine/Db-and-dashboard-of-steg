import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../context/useAuth";
import ax from "../api/customizedaxios";

const IsChiefProtectedRoute = ({ children }) => {
    const { user, setuser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    const cameFromSidebar = location.state?.fromSidebar;

    useEffect(() => {
        const checkAuthorization = async () => {
            // Skip API call if came from sidebar and already a chief
            if (cameFromSidebar && user?.is_chief) {
                setLoading(false);
                return;
            }

            try {
                
                const res = await ax.get("auth/check");
                setuser(res.data.user);

                if (!res.data.user.is_chief) {
                    toast.error("Only chiefs are allowed to access this section.");
                    navigate("/central/dashboard", { replace: true });
                }
            } catch (err) {
                console.error(err);
                toast.error("Auth check failed. Try again.");
                navigate("/central/dashboard", { replace: true });
            } finally {
                setLoading(false);
            }
        };

        checkAuthorization();
    }, [cameFromSidebar]);

    if (loading || !user?.is_chief) return null;

    return children;
};

export default IsChiefProtectedRoute;
