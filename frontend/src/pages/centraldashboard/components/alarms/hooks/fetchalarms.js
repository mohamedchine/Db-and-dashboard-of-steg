import { useState, useEffect, useContext } from "react";
import { TurbinesContext } from "../../../../../context/turbinesContext";
import api from "../apicalls/fetchalarms";
import addTurbineName from "../utils/filteralarms";

export const useFetchUnresolvedAlarms = (centralId, turbineId) => {
    const [alarms, setAlarms] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { turbines } = useContext(TurbinesContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await api.fetchUnresolvedAlarms(centralId, turbineId);
                const enrichedData = addTurbineName(data, turbines);
                setAlarms(enrichedData);
            } catch (err) {
                console.error("Fetch unresolved alarms error:", err);
                setAlarms([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [centralId, turbineId, turbines]);

    return { loading, alarms };
};






export const useFetchResolvedAlarms = (centralId, turbineId) => {
    const [alarms, setAlarms] = useState([]);
    const [loading, setLoading] = useState(true);
    const { turbines } = useContext(TurbinesContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await api.fetchResolvedAlarms(centralId, turbineId);
                const enrichedData = addTurbineName(data, turbines);
                setAlarms(enrichedData);
            } catch (err) {
                console.error("Fetch resolved alarms error:", err);
                setAlarms([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [centralId, turbineId, turbines]);

    return { loading, alarms };
};



export const useFetchPendingAlarms = (centralId, turbineId) => {
    const [alarms, setAlarms] = useState([]);
    const [loading, setLoading] = useState(true);
    const { turbines } = useContext(TurbinesContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await api.fetchPendingAlarms(centralId, turbineId);
                const enrichedData = addTurbineName(data, turbines);
                setAlarms(enrichedData);
            } catch (err) {
                console.error("Error fetching pending alarms:", err);
                setAlarms([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [centralId, turbineId, turbines]);

    return { loading, alarms };
};