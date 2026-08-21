import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getNotificationsApi,
  getNotificationByIdApi,
  markNotificationAsReadApi,
  markAllNotificationsAsReadApi,
  deleteNotificationApi,
} from "../../api/notification.api";

import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/customToast.jsx";


// ==========================================
// GET NOTIFICATIONS
// ==========================================

export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getNotificationsApi();

      return response;
    } catch (error) {
       // Don't show an error toast when User is not logged in
      const status = error.response?.status;
      if (status === 401) {
        return rejectWithValue(null);
      }
      const message =
        error.response?.data?.message ||
        "Failed to fetch notifications";

       

      showErrorToast(message);

      return rejectWithValue(message);
    }
  }
);


// ==========================================
// GET NOTIFICATION BY ID
// ==========================================

export const getNotificationById = createAsyncThunk(
  "notifications/getNotificationById",
  async (notificationId, { rejectWithValue }) => {
    try {
      const response =
        await getNotificationByIdApi(notificationId);

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to fetch notification";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  }
);


// ==========================================
// MARK NOTIFICATION AS READ
// ==========================================

export const markNotificationAsRead = createAsyncThunk(
  "notifications/markNotificationAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      const response =
        await markNotificationAsReadApi(notificationId);

      return {
        ...response,
        notificationId,
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to mark notification as read";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  }
);


// ==========================================
// MARK ALL AS READ
// ==========================================

export const markAllNotificationsAsRead = createAsyncThunk(
  "notifications/markAllNotificationsAsRead",
  async (_, { rejectWithValue }) => {
    try {
      const response =
        await markAllNotificationsAsReadApi();
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to mark all notifications as read";
      return rejectWithValue(message);
    }
  }
);


// ==========================================
// DELETE NOTIFICATION
// ==========================================

export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (notificationId, { rejectWithValue }) => {
    try {
      const response =
        await deleteNotificationApi(notificationId);

      return {
        ...response,
        notificationId,
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to delete notification";

      showErrorToast(message);

      return rejectWithValue(message);
    }
  }
);