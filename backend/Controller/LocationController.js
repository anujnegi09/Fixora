import axios from "axios";
import { asyncHandler } from "../Utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

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