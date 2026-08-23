import { createSlice } from "@reduxjs/toolkit";

import {
  getNotifications,
  getNotificationById,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "./notificationThunks";

const initialState = {
  // ===============================
  // Notifications
  // ===============================

  notifications: [],

  // ===============================
  // Current Notification
  // ===============================

  notification: null,

  // ===============================
  // Loading
  // ===============================

  loading: false,
  notificationLoading: false,
  markReadLoading: false,
  markAllReadLoading: false,
  deleteLoading: false,

   newNotificationCount: 0,

  // ===============================
  // Error
  // ===============================

  error: null,
};

const notificationSlice = createSlice({
  name: "notification",

  initialState,

  reducers: {
    clearNotificationError: (state) => {
      state.error = null;
    },
    
    clearCurrentNotification: (state) => {
      state.notification = null;
    },

    incrementNewNotificationCount: (state) => {
    state.newNotificationCount += 1;
  },

  resetNewNotificationCount: (state) => {
    state.newNotificationCount = 0;
  },
  },

  extraReducers: (builder) => {
    builder

      // ==========================================
      // GET NOTIFICATIONS
      // ==========================================

      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;

        const data = action.payload.data;

        state.notifications = data.notifications || [];
        state.nextCursor = data.nextCursor || null;
        state.hasMore = data.hasMore || false;
      })

      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================================
      // GET NOTIFICATION BY ID
      // ==========================================

      .addCase(getNotificationById.pending, (state) => {
        state.notificationLoading = true;
        state.error = null;
      })

      .addCase(getNotificationById.fulfilled, (state, action) => {
        state.notificationLoading = false;

        state.notification = action.payload.data;
      })

      .addCase(getNotificationById.rejected, (state, action) => {
        state.notificationLoading = false;
        state.error = action.payload;
      })

      // ==========================================
      // MARK AS READ
      // ==========================================

      .addCase(markNotificationAsRead.pending, (state) => {
        state.markReadLoading = true;
        state.error = null;
      })

      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.markReadLoading = false;

        const notificationId = action.payload.notificationId;

        state.notifications = state.notifications.map((notification) =>
          notification._id === notificationId
            ? {
                ...notification,
                isRead: true,
              }
            : notification,
        );

        if (state.notification?._id === notificationId) {
          state.notification.isRead = true;
        }
      })

      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.markReadLoading = false;
        state.error = action.payload;
      })

      // ==========================================
      // MARK ALL AS READ
      // ==========================================

      .addCase(markAllNotificationsAsRead.pending, (state) => {
        state.markAllReadLoading = true;
        state.error = null;
      })

      .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
        state.markAllReadLoading = false;

        state.notifications = state.notifications.map((notification) => ({
          ...notification,
          isRead: true,
        }));
      })

      .addCase(markAllNotificationsAsRead.rejected, (state, action) => {
        state.markAllReadLoading = false;
        state.error = action.payload;
      })

      // ==========================================
      // DELETE NOTIFICATION
      // ==========================================

      .addCase(deleteNotification.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.deleteLoading = false;

        const notificationId = action.payload.notificationId;

        state.notifications = state.notifications.filter(
          (notification) => notification._id !== notificationId,
        );

        if (state.notification?._id === notificationId) {
          state.notification = null;
        }
      })

      .addCase(deleteNotification.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNotificationError, clearCurrentNotification,incrementNewNotificationCount,
  resetNewNotificationCount, } =
  notificationSlice.actions;

export default notificationSlice.reducer;
