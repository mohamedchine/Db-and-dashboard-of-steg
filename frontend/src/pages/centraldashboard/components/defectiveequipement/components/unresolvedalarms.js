
import React from "react";
import Alamrsmdl from "./alarmsmodel";
import { Box, CircularProgress } from "@mui/material";
import useAuth from "../../../../../context/useAuth";
import { useFetchUnresolvedAlarms } from "../hooks/fetchalarms";
const Unresolved = ({ turbineId }) => {
    const { user } = useAuth();
    const { loading, alarms } = useFetchUnresolvedAlarms(user.central_id, turbineId);

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
            title="Unresolved Alarms"
            subtitle="Alarms that require attention"
        />
    );
};

export default Unresolved;
