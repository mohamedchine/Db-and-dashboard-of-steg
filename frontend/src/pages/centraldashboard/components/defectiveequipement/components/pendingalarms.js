import React from "react";
import Alamrsmdl from "./alarmsmodel";
import { Box, CircularProgress } from "@mui/material";
import useAuth from "../../../../../context/useAuth";
import { useFetchPendingAlarms } from "../hooks/fetchalarms";


const Pending = ({ turbineId }) => {
    const { user } = useAuth();
    const { loading, alarms } = useFetchPendingAlarms(user.central_id, turbineId);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Alamrsmdl
            alarms={alarms}
            title="Pending Alarms"
            subtitle="Alarms under maintenance"
        />
    );
};

export default Pending;