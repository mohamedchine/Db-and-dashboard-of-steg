import React from "react";
import Equipementsmdl from "./equipementmdl";
import { Box, CircularProgress } from "@mui/material";
import useAuth from "../../../../../context/useAuth";
import { useFetchfixedequipements } from "../hooks/fetchequipements";

const Fixed = ({ turbineId }) => {
    const { user } = useAuth();
    const { loading, equipements } = useFetchfixedequipements(user.central_id, turbineId);

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
            title="Fixed Equipements"
            subtitle="Equipements that have been addressed"
        />
    );
};

export default Fixed;