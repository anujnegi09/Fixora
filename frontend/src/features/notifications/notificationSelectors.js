// Notifications

export const selectNotifications = (state) =>
  state.notification.notifications;


// Current Notification

export const selectNotification = (state) =>
  state.notification.notification;


// Loading

export const selectNotificationLoading = (state) =>
  state.notification.loading;


// Get Notification By ID Loading

export const selectNotificationByIdLoading = (state) =>
  state.notification.notificationLoading;


// Mark Notification As Read Loading

export const selectMarkNotificationReadLoading = (state) =>
  state.notification.markReadLoading;


// Mark All Notifications As Read Loading

export const selectMarkAllReadLoading = (state) =>
  state.notification.markAllReadLoading;


// Delete Notification Loading

export const selectDeleteNotificationLoading = (state) =>
  state.notification.deleteLoading;


// Error

export const selectNotificationError = (state) =>
  state.notification.error;


// Unread Notification Count

export const selectUnreadNotificationCount = (state) =>
  Array.isArray(state.notification?.notifications)
    ? state.notification.notifications.filter(
        (notification) => !notification.isRead
      ).length
    : 0;


export const selectNewNotificationCount = (state) =>
  state.notification.newNotificationCount;