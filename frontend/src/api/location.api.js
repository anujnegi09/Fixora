import api from "./axios.js";

export const reverseGeocodeApi = async (lat, lng) => {

    const { data } = await api.get("/location/reverse-geocode", {
        params: {
            lat,
            lng,
        },
    });

    return data.data;
};


export const searchLocationApi = async (query) => {

    const { data } = await api.get("/location/search", {
        params: {
            q: query,
        },
    });

    return data.data;

};