import api from "./axios.js"

export const getNotificationsApi =async () =>{
    const response = await api.get("/notifications");
    return response.data;
}

export const getNotificationByIdApi = async() =>{
    const response = await api.get(`/notifications/${notificationId}`);
    return response.data;
}
 
export const markNotificationAsReadApi = async (notificationId) => {
  const response = await api.patch(
    `/notifications/read/${notificationId}`
  );

  return response.data;
};

export const markAllNotificationsAsReadApi = async () => {
  const response = await api.patch(
    "/notifications/read-all"
  );

  return response.data;
};

export const deleteNotificationApi = async (notificationId) => {
  const response = await api.delete(
    `/notifications/${notificationId}`
  );

  return response.data;
};

export const getNewNotificationCountApi = async () => {
  const response = await api.get("/notifications/new-count");

  return response.data;
};

export const markNewNotificationsAsSeenApi = async () => {
  const response = await api.patch(
    "/notifications/mark-new-as-seen"
  );

  return response.data;
};