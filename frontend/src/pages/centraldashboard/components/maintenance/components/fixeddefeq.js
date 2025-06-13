import React from "react";
import MaintenanceMdl from "./equipementmdl";
import { Box, CircularProgress } from "@mui/material";
import useAuth from "../../../../../context/useAuth";
import { useFetchdonemaintenances } from "../hooks/fetchequipements";

const Fixed = ({ turbineId }) => {
    const { user } = useAuth();
    const { loading, maintenances } = useFetchdonemaintenances(user.central_id, turbineId);
    
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <MaintenanceMdl
           maintenances={maintenances}
            title="Done maintenances"
            subtitle="maintenances that ended"
        />
    );
};

export default Fixed;