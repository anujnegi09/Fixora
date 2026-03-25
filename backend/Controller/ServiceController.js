import mongoose from "mongoose";
import Service from "../Models/Service.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";

/**
 * @desc Create a new service
 */
export const createService = asyncHandler(async (req, res) => {
  const { title, description, location, phoneNumber, availability, price } = req.body;

  // ✅ Better validation
  const requiredFields = { title, description, location, phoneNumber, availability, price };
  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value) {
      throw new apiError(400, `${key} is required`);
    }
  }

  const service = await Service.create({
    userId: req.user._id,
    title,
    description,
    location,
    phoneNumber,
    availability,
    price
  });

  res.status(201).json(
    new apiResponse(201, service, "Service created successfully")
  );
});

/**
 * @desc Get all services (with pagination + search)
 */
export const getAllServices = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, location, title } = req.query;

  const filter = {};

  // ✅ Search filters
  if (location) filter.location = { $regex: location, $options: "i" };
  if (title) filter.title = { $regex: title, $options: "i" };

  const skip = (page - 1) * limit;

  const services = await Service.find(filter)
    .populate("userId", "fullName email")
    .skip(skip)
    .limit(parseInt(limit))
    .lean();

  const total = await Service.countDocuments(filter);

  res.status(200).json(
    new apiResponse(200, {
      services,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    }, "Services fetched successfully")
  );
});

/**
 * @desc Get a single service by ID
 */
export const getServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // ✅ ObjectId validation
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new apiError(400, "Invalid service ID");
  }

  const service = await Service.findById(id)
    .populate("userId", "fullName email")
    .lean();

  if (!service) {
    throw new apiError(404, "Service not found");
  }

  res.status(200).json(
    new apiResponse(200, service, "Service fetched successfully")
  );
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

  const service = await Service.findById(id);
  if (!service) {
    throw new apiError(404, "Service not found");
  }

  // ✅ Authorization check
  if (service.userId.toString() !== req.user._id.toString()) {
    throw new apiError(403, "You are not authorized to update this service");
  }

  const { title, description, location, phoneNumber, availability, price } = req.body;

  // ✅ Clean update
  Object.assign(service, {
    ...(title && { title }),
    ...(description && { description }),
    ...(location && { location }),
    ...(phoneNumber && { phoneNumber }),
    ...(availability && { availability }),
    ...(price && { price }),
  });

  const updatedService = await service.save();

  res.status(200).json(
    new apiResponse(200, updatedService, "Service updated successfully")
  );
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

  res.status(200).json(
    new apiResponse(200, null, "Service deleted successfully")
  );
});