import React from "react";
import Alamrsmdl from "./alarmsmodel";
import { Box, CircularProgress } from "@mui/material";
import useAuth from "../../../../../context/useAuth";
import { useFetchResolvedAlarms } from "../hooks/fetchalarms";
// import { useFetchResolvedAlarms } from "../hooks/useFetchResolvedAlarms";

const Resolved = ({ turbineId }) => {
    const { user } = useAuth();
    const { loading, alarms } = useFetchResolvedAlarms(user.central_id, turbineId);

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
            title="Resolved Alarms"
            subtitle="Alarms that have been addressed"
        />
    );
};

export default Resolved;