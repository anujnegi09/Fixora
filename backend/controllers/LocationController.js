import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

export const reverseGeocode = asyncHandler(async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    throw new apiError(400, "Latitude and Longitude are required");
  }

  const { data } = await axios.get("https://us1.locationiq.com/v1/reverse", {
    params: {
      key: process.env.LOCATIONIQ_API_KEY,
      lat,
      lon: lng,
      format: "json",
      addressdetails: 1,
    },
  });

  return res
    .status(200)
    .json(new apiResponse(200, data, "Location fetched successfully"));
});

export const searchLocation = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q) {
    throw new apiError(400, "Search query is required");
  }

  const { data } = await axios.get("https://us1.locationiq.com/v1/search", {
    params: {
      key: process.env.LOCATIONIQ_API_KEY,
      q,
      format: "json",
      addressdetails: 1,
      limit: 5,
      countrycodes: "in",
    },
  });

  return res
    .status(200)
    .json(new apiResponse(200, data, "Locations fetched successfully"));
});
