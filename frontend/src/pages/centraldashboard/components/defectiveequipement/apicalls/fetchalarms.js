import axs from "../../../../../api/customizedaxios";


const fetchUnresolvedAlarms = async (centralId, turbineId) => {
    let response;

    if (turbineId !== 'all') {
        response = await axs.get(`/alarms/unresolved/${centralId}?turbine=${turbineId}`);
    } else {
        response = await axs.get(`/alarms/unresolved/${centralId}`);
    }

    return response.data.data;
};





const fetchResolvedAlarms = async (centralId, turbineId) => {
    let response;

    if (turbineId !== 'all') {
        response = await axs.get(`/alarms/resolved/${centralId}?turbine=${turbineId}`);
    } else {
        response = await axs.get(`/alarms/resolved/${centralId}`);
    }

    return response.data.data;
};





const fetchPendingAlarms = async (centralId, turbineId) => {
    let response;

    if (turbineId !== 'all') {
        response = await axs.get(`/alarms/pending/${centralId}?turbine=${turbineId}`);
    } else {
        response = await axs.get(`/alarms/pending/${centralId}`);
    }

    return response.data.data;
};


export default {
    fetchUnresolvedAlarms,fetchResolvedAlarms,    fetchPendingAlarms
  };