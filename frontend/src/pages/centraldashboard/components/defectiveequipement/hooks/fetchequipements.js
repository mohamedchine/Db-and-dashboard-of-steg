import { useState, useEffect, useContext } from "react";
import { TurbinesContext } from "../../../../../context/turbinesContext";
import api from "../apicalls/fetchequipements";
import addTurbineName from "../utils/filterequipements";

export const useFetchNotfixed = (centralId, turbineId) => {
    const [equipements, setequipements] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { turbines } = useContext(TurbinesContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await api.fetchnotffixedequipements(centralId, turbineId);
                const enrichedData = addTurbineName(data, turbines);
                setequipements(enrichedData);
            } catch (err) {
                console.error("Fetch not fixed equipements error:", err);
                setequipements([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [centralId, turbineId, turbines]);

    return { loading, equipements };
};






export const useFetchfixedequipements = (centralId, turbineId) => {
    const [equipements, setequipements] = useState([]);
    const [loading, setLoading] = useState(true);
    const { turbines } = useContext(TurbinesContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await api.fetchffixedequipements(centralId, turbineId);
                const enrichedData = addTurbineName(data, turbines);
                setequipements(enrichedData);
            } catch (err) {
                console.error("Fetch fixed equipements error:", err);
                setequipements([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [centralId, turbineId, turbines]);

    return { loading, equipements };
};



export const useFetchPendingequipements = (centralId, turbineId) => {
    const [equipements, setequipements] = useState([]);
    const [loading, setLoading] = useState(true);
    const { turbines } = useContext(TurbinesContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await api.fetchPendingequipement(centralId, turbineId);
                const enrichedData = addTurbineName(data, turbines);
                setequipements(enrichedData);
            } catch (err) {
                console.error("Error fetching pending equipements:", err);
                setequipements([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [centralId, turbineId, turbines]);

    return { loading, equipements };
};