import api from "./axios.js";

export const reverseGeocode = async (lat, lng) => {

    const { data } = await api.get("/location/reverse-geocode", {
        params: {
            lat,
            lng,
        },
    });

    return data.data;
};
// import axios from "axios";

// export const reverseGeocode = async (lat, lng) => {
//     try {

//         const { data } = await axios.get(
//             "https://nominatim.openstreetmap.org/reverse",
//             {
//                 params: {
//                     format: "jsonv2",
//                     lat,
//                     lon: lng,
//                 },
//                 headers: {
//                     "Accept-Language": "en",
//                 },
//             }
//         );

//         return data;

//     } catch (error) {

//         console.error("Reverse Geocoding Error:", error);

//         throw error;

//     }
// };


// export const searchLocation = async (query) => {

//     try {

//         const { data } = await axios.get(
//             "https://nominatim.openstreetmap.org/search",
//             {
//                 params: {
//                     q: query,
//                     format: "jsonv2",
//                     addressdetails: 1,
//                     limit: 5,
//                 },
//                 headers: {
//                     "Accept-Language": "en",
//                 },
//             }
//         );

//         return data;

//     } catch (error) {

//         console.error("Search Location Error:", error);

//         throw error;

//     }

// };