import axios from "axios";
import { asyncHandler } from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";

export const reverseGeocode = asyncHandler(async (req, res) => {

    const { lat, lng } = req.query;

    if (!lat || !lng) {
        throw new apiError(400, "Latitude and Longitude are required");
    }

    const { data } = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
            params: {
                format: "jsonv2",
                lat,
                lon: lng,
            },
            headers: {
                "User-Agent": "Fixora/1.0 (anujnegi9997@gmail.com)",
                "Accept-Language": "en",
            },
        }
    );

    return res.status(200).json(

        new apiResponse(
            200,
            data,
            "Location fetched successfully"
        )

    );

});


export const searchLocation = asyncHandler(async (req, res) => {

    const { q } = req.query;

    if (!q) {
        throw new apiError(400, "Search query is required");
    }

    const { data } = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
            params: {
                q,
                format: "jsonv2",
                addressdetails: 1,
                limit: 5,
            },
            headers: {
                "User-Agent": "Fixora/1.0 (anujnegi9997@gmail.com)",
                "Accept-Language": "en",
            },
        }
    );

    return res.status(200).json(
        new apiResponse(
            200,
            data,
            "Locations fetched successfully"
        )
    );

});