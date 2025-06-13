import axs from "../../../../../api/customizedaxios";


const fetchongoing = async (centralId, turbineId) => {
    let response;

    if (turbineId !== 'all') {
        response = await axs.get(`/maintenance/ongoing/${centralId}?turbine=${turbineId}`);
    } else {
        response = await axs.get(`/maintenance/ongoing/${centralId}`);
    }

    return response.data.data;
};





const fetchdone = async (centralId, turbineId) => {
    let response;

    if (turbineId !== 'all') {
        response = await axs.get(`/maintenance/finished/${centralId}?turbine=${turbineId}`);
    } else {
        response = await axs.get(`/maintenance/finished/${centralId}`);
    }

    return response.data.data;
};








export default {
    fetchongoing,fetchdone
  };