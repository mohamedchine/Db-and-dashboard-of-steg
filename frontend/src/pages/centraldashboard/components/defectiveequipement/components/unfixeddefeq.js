
import React from "react";
import Equipementsmdl from "./equipementmdl";
import { Box, CircularProgress } from "@mui/material";
import useAuth from "../../../../../context/useAuth";
import { useFetchNotfixed} from "../hooks/fetchequipements";
const Unfixed = ({ turbineId }) => {
    const { user } = useAuth();
    const { loading, equipements } = useFetchNotfixed(user.central_id, turbineId);

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
            title="Unfixed Equipements"
            subtitle="Equipements that require attention"
        />
    );
};

export default Unfixed;
