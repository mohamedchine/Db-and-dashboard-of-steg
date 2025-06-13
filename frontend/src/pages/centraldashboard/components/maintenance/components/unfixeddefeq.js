
import React from "react";
import Equipementsmdl from "./equipementmdl";
import { Box, CircularProgress } from "@mui/material";
import useAuth from "../../../../../context/useAuth";
import { useFetchOnGoingMaintenance} from "../hooks/fetchequipements";
const MaintenanceMdl = ({ turbineId }) => {
    const { user } = useAuth();
    const { loading, maintenances } = useFetchOnGoingMaintenance(user.central_id, turbineId);
   
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                <CircularProgress />
            </Box>
        );
    }
    return (
        <Equipementsmdl
            maintenances={maintenances}
            title="Ongoing maintenances"
            subtitle="maintenances that didn't end yet"
        />
    );
};

export default MaintenanceMdl;
