import mongoose from "mongoose";
import Service from "../Models/Service.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";

export const getMyServices = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const services = await Service.find({
    userId,
  }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, services, "Your services fetched successfully"));
});

/**
 * @desc Create a new service
 */

export const createService = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    phoneNumber,
    availability,
    price,
    serviceRadius,
    location,
    bookingOptions,
  } = req.body;

  const requiredFields = {
    title,
    description,
    category,
    phoneNumber,
    availability,
    price,
    serviceRadius,
    location,
    bookingOptions,
  };

  for (const [key, value] of Object.entries(requiredFields)) {
    if (value === undefined || value === null || value === "") {
      throw new apiError(400, `${key} is required`);
    }
  }
  if (
    location?.latitude === undefined ||
    location?.longitude === undefined ||
    location?.latitude === null ||
    location?.longitude === null
  ) {
    throw new apiError(400, "Location coordinates are required");
  }
  const service = await Service.create({
    userId: req.user._id,

    title,
    description,
    category,
    phoneNumber,
    availability,
    price,
    serviceRadius,
    bookingOptions,
    location: {
      address: location.address,
      city: location.city,
      state: location.state,
      pincode: location.pincode,
      coordinates: {
        type: "Point",
        coordinates: [Number(location.longitude), Number(location.latitude)],
      },
    },
  });

  res
    .status(201)
    .json(new apiResponse(201, service, "Service created successfully"));
});

/**
 * @desc Get all services (with pagination + search)
 */
export const getAllServices = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    title,
    category,
    sortBy,
    latitude,
    longitude,
  } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const filter = {
    isVisible: true,
    userId: { $ne: req.user._id },
  };
  let sortStage;

  switch (sortBy) {
    case "newest":
      sortStage = { createdAt: -1 };
      break;

    case "oldest":
      sortStage = { createdAt: 1 };
      break;

    case "price-low":
      sortStage = { price: 1 };
      break;

    case "price-high":
      sortStage = { price: -1 };
      break;

    case "rating":
      sortStage = { averageRating: -1 };
      break;

    case "popular":
      sortStage = { totalReviews: -1 };
      break;

    default:
      // Default: nearest services first
      sortStage = { distance: 1 };
  }

  // Search by title
  // Search by title OR category
  if (title) {
    filter.$or = [
      {
        title: {
          $regex: title,
          $options: "i",
        },
      },
      {
        category: {
          $regex: title,
          $options: "i",
        },
      },
    ];
  }
  if (category) {
    filter.category = {
      $regex: category,
      $options: "i",
    };
  }

  let services;
  let total;

  // ==========================================
  // USER LOCATION AVAILABLE
  // ==========================================

  if (latitude && longitude) {
    const userLongitude = Number(longitude);
    const userLatitude = Number(latitude);

    const pipeline = [
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [userLongitude, userLatitude],
          },
          distanceField: "distance",
          spherical: true,
          query: filter,
        },
      },

      // Convert provider's serviceRadius from KM to meters
      // and only keep services within their own radius.
      {
        $match: {
          $expr: {
            $lte: [
              "$distance",
              {
                $multiply: ["$serviceRadius", 1000],
              },
            ],
          },
        },
      },

      {
        $facet: {
          services: [
            {
              $sort: sortStage,
            },
            {
              $skip: skip,
            },
            {
              $limit: Number(limit),
            },
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userId",
              },
            },
            {
              $unwind: {
                path: "$userId",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                "userId.password": 0,
                "userId.refreshToken": 0,
              },
            },
          ],

          total: [
            {
              $count: "count",
            },
          ],
        },
      },
    ];

    const result = await Service.aggregate(pipeline);

    services = result[0]?.services || [];
    total = result[0]?.total[0]?.count || 0;
  }

  // ==========================================
  // NO USER LOCATION
  // ==========================================
  else {
    services = await Service.find(filter)
      .populate("userId", "fullName email profilePhoto")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    total = await Service.countDocuments(filter);
  }

  // ==========================================
  // RESPONSE
  // ==========================================

  res.status(200).json(
    new apiResponse(
      200,
      {
        services,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
      },
      "Services fetched successfully",
    ),
  );
});

// /**
//  * @desc Get a single service by ID
//  */
export const getServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // ✅ ObjectId validation
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new apiError(400, "Invalid service ID");
  }

  const service = await Service.findOne({ _id: id, isVisible: true })
    .populate("userId", "fullName email")
    .lean();

  if (!service) {
    throw new apiError(404, "Service not found");
  }

  res
    .status(200)
    .json(new apiResponse(200, service, "Service fetched successfully"));
});

/**
 * @desc Update a service
 */
export const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // ✅ ObjectId validation
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new apiError(400, "Invalid service ID");
  }

  const service = await Service.findOne({ _id: id});
  if (!service) {
    throw new apiError(404, "Service not found");
  }

  // ✅ Authorization check
  if (service.userId.toString() !== req.user._id.toString()) {
    throw new apiError(403, "You are not authorized to update this service");
  }

  const {
    title,
    description,
    location,
    phoneNumber,
    availability,
    price,
    category,
    serviceRadius,
    bookingOptions,
  } = req.body;

  // ✅ Clean update
Object.assign(service, {
  ...(title !== undefined && { title }),
  ...(description !== undefined && { description }),
  ...(category !== undefined && { category }),
  ...(phoneNumber !== undefined && { phoneNumber }),

  ...(availability !== undefined && { availability }),
  ...(bookingOptions !== undefined && { bookingOptions }),

  ...(price !== undefined && { price }),
  ...(serviceRadius !== undefined && { serviceRadius }),
});
if (location) {
  if (
    location.latitude === undefined ||
    location.longitude === undefined ||
    location.latitude === null ||
    location.longitude === null
  ) {
    throw new apiError(400, "Location coordinates are required");
  }

  service.location = {
    address: location.address,
    city: location.city,
    state: location.state,
    pincode: location.pincode,

    coordinates: {
      type: "Point",
      coordinates: [
        Number(location.longitude),
        Number(location.latitude),
      ],
    },
  };
}

  const updatedService = await service.save();

  res
    .status(200)
    .json(new apiResponse(200, updatedService, "Service updated successfully"));
});

/**
 * @desc Delete a service
 */
export const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // ✅ ObjectId validation
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new apiError(400, "Invalid service ID");
  }

  const service = await Service.findById(id);
  if (!service) {
    throw new apiError(404, "Service not found");
  }

  // ✅ Authorization check
  if (service.userId.toString() !== req.user._id.toString()) {
    throw new apiError(403, "You are not authorized to delete this service");
  }

  await service.deleteOne();

  res
    .status(200)
    .json(new apiResponse(200, null, "Service deleted successfully"));
});

export const toggleServiceVisibility = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const service = await Service.findById(id);

  if (!service) {
    throw new apiError(404, "Service not found");
  }

  // Only the owner can change visibility
  if (service.userId.toString() !== req.user._id.toString()) {
    throw new apiError(403, "Not authorized");
  }

  service.isVisible = !service.isVisible;

  await service.save();

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        service,
        `Service ${service.isVisible ? "visible" : "hidden"} successfully`,
      ),
    );
});