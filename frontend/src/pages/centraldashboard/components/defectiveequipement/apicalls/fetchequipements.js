import axs from "../../../../../api/customizedaxios";


const fetchnotffixedequipements = async (centralId, turbineId) => {
    let response;

    if (turbineId !== 'all') {
        response = await axs.get(`/defectiveequipements/notfixed/${centralId}?turbine=${turbineId}`);
    } else {
        response = await axs.get(`/defectiveequipements/notfixed/${centralId}`);
    }

    return response.data.data;
};





const fetchffixedequipements = async (centralId, turbineId) => {
    let response;

    if (turbineId !== 'all') {
        response = await axs.get(`/defectiveequipements/fixed/${centralId}?turbine=${turbineId}`);
    } else {
        response = await axs.get(`/defectiveequipements/fixed/${centralId}`);
    }

    return response.data.data;
};





const fetchPendingequipement = async (centralId, turbineId) => {
    let response;

    if (turbineId !== 'all') {
        response = await axs.get(`/defectiveequipements/pending/${centralId}?turbine=${turbineId}`);
    } else {
        response = await axs.get(`/defectiveequipements/pending/${centralId}`);
    }

    return response.data.data;
};


export default {
    fetchnotffixedequipements,fetchffixedequipements,    fetchPendingequipement
  };