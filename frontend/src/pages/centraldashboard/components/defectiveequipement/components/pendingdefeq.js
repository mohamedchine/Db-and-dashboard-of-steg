import React from "react";
import Equipementsmdl from "./equipementmdl";
import { Box, CircularProgress } from "@mui/material";
import useAuth from "../../../../../context/useAuth";
import {  useFetchPendingequipements } from "../hooks/fetchequipements";


const Pending = ({ turbineId }) => {
    const { user } = useAuth();
    const { loading, equipements } = useFetchPendingequipements(user.central_id, turbineId);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Equipementsmdl
            equipements={equipements}
            title="Pending Equipements"
            subtitle="Equipements under maintenance"
        />
    );
};

export default Pending;