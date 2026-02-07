import Service from "../Models/Service.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";

/**
 * @desc Create a new service
 */
export const createService = asyncHandler(async (req, res) => {
  const { title, description, location, phoneNumber, availability } = req.body;
  console.log("req.body:" , req.body);

  if (!title || !description || !location || !phoneNumber || !availability) {
    throw new apiError(400, "All fields are required");
  }

  // ✅ Add userId from authenticated user
  const service = await Service.create({
    userId: req.user._id, // assuming authentication middleware adds req.user
    title,
    description,
    location,
    phoneNumber,
    availability,
  });

  res
    .status(201)
    .json(new apiResponse(201, "Service created successfully", service));
});

/**
 * @desc Get all services
 */
export const getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find().populate("userId", "fullName email");
  res
    .status(200)
    .json(new apiResponse(200, "Services fetched successfully", services));
});

/**
 * @desc Get a single service by ID
 */
export const getServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const service = await Service.findById(id).populate("userId", "fullName email");
  if (!service) {
    throw new apiError(404, "Service not found");
  }

  res
    .status(200)
    .json(new apiResponse(200, "Service fetched successfully", service));
});

/**
 * @desc Update a service
 */
export const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, location, phoneNumber, availability } = req.body;

  const service = await Service.findById(id);
  if (!service) {
    throw new apiError(404, "Service not found");
  }

  // ✅ Optional: only allow the owner to update
  if (service.userId.toString() !== req.user._id.toString()) {
    throw new apiError(403, "You are not authorized to update this service");
  }

  service.title = title || service.title;
  service.description = description || service.description;
  service.location = location || service.location;
  service.phoneNumber = phoneNumber || service.phoneNumber;
  service.availability = availability || service.availability;

  const updatedService = await service.save();

  res
    .status(200)
    .json(new apiResponse(200, "Service updated successfully", updatedService));
});

/**
 * @desc Delete a service
 */
export const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const service = await Service.findById(id);
  if (!service) {
    throw new apiError(404, "Service not found");
  }

  // ✅ Optional: only allow the owner to delete
  if (service.userId.toString() !== req.user._id.toString()) {
    throw new apiError(403, "You are not authorized to delete this service");
  }

  await service.deleteOne();

  res
    .status(200)
    .json(new apiResponse(200, "Service deleted successfully"));
});
