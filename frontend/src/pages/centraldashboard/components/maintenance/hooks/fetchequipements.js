import { useState, useEffect, useContext } from "react";
import { TurbinesContext } from "../../../../../context/turbinesContext";
import api from "../apicalls/fetchequipements";
import addTurbineName from "../utils/filterequipements";

export const useFetchOnGoingMaintenance = (centralId, turbineId) => {
    const [maintenances, setmaintenances] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { turbines } = useContext(TurbinesContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await api.fetchongoing(centralId, turbineId);
                const enrichedData = addTurbineName(data, turbines);
                setmaintenances(enrichedData);
            } catch (err) {
                console.error("Fetch not fixed maintenances error:", err);
                setmaintenances([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [centralId, turbineId, turbines]);

    return { loading, maintenances };
};






export const useFetchdonemaintenances = (centralId, turbineId) => {
    const [maintenances, setmaintenances] = useState([]);
    const [loading, setLoading] = useState(true);
    const { turbines } = useContext(TurbinesContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await api.fetchdone(centralId, turbineId);
                const enrichedData = addTurbineName(data, turbines);
                setmaintenances(enrichedData);
            } catch (err) {
                console.error("Fetch fixed maintenances error:", err);
                setmaintenances([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [centralId, turbineId, turbines]);

    return { loading, maintenances };
};


