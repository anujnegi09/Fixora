import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "../../features/notifications/notificationThunks";

import {
  selectNotifications,
  selectNotificationLoading,
  selectNotificationError,
} from "../../features/notifications/notificationSelectors";
import { selectIsAuthenticated } from "../../features/auth/authSelectors";

import NotificationCard from "../../components/notification/NotificationCard";

const Notifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ==========================================
  // Active Tab
  // ==========================================

  const [activeTab, setActiveTab] = useState("all");

  // ==========================================
  // Redux
  // ==========================================
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const notifications = useSelector(selectNotifications);
  const loading = useSelector(selectNotificationLoading);
  const error = useSelector(selectNotificationError);

  // ==========================================
  // Fetch Notifications
  // ==========================================

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getNotifications());
    }
  }, [isAuthenticated, dispatch]);

  // ==========================================
  // Filter Notifications
  // ==========================================

  const filteredNotifications = notifications.filter((notification) => {
    switch (activeTab) {
      // All notifications
      case "all":
        return true;

      // Unread notifications
      case "unread":
        return !notification.isRead;

      // Notifications related to user's bookings
      case "my-bookings":
        return notification.category === "my_booking";

      // Notifications related to user's services
      case "my-service-bookings":
        return notification.category === "my_service_booking";

      default:
        return true;
    }
  });

  // ==========================================
  // Tabs
  // ==========================================

  const tabs = [
    {
      id: "all",
      label: "All",
    },
    {
      id: "unread",
      label: "Unread",
    },
    {
      id: "my-bookings",
      label: "My Bookings",
    },
    {
      id: "my-service-bookings",
      label: "My Service Bookings",
    },
  ];
  const handleNotificationClick = (notification) => {
    // Redirect using backend redirectTo
    if (notification.redirectTo) {
      navigate(notification.redirectTo);
    }
  };

  const handleMarkAsRead = (notificationId) => {
    dispatch(markNotificationAsRead(notificationId));
  };
  const handleDeleteNotification = (notificationId) => {
    dispatch(deleteNotification(notificationId));
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* ==================================
            Header
        ================================== */}

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>

          <p className="mt-1 text-sm text-gray-500">
            Stay updated with your bookings and services.
          </p>
        </div>

        {/* ==================================
            Notification Container
        ================================== */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* ==================================
              Tabs
          ================================== */}

          <div className="border-b border-gray-200 px-4">
            <div className="flex gap-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative whitespace-nowrap py-4 text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab.label}

                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ==================================
              Loading
          ================================== */}

          {loading && (
            <div className="py-20 text-center">
              <p className="text-sm font-medium text-blue-600">
                Loading notifications...
              </p>
            </div>
          )}

          {/* ==================================
              Error
          ================================== */}

          {!loading && error && (
            <div className="p-6">
              <div className="rounded-lg bg-red-50 p-4 text-center text-sm text-red-600">
                {error}
              </div>
            </div>
          )}

          {/* ==================================
              Empty State
          ================================== */}

          {!loading && !error && filteredNotifications.length === 0 && (
            <div className="py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
                🔔
              </div>

              <h2 className="mt-4 text-lg font-semibold text-gray-800">
                No notifications
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                You're all caught up.
              </p>
            </div>
          )}

          {/* ==================================
              Notifications
          ================================== */}

          {!loading && !error && filteredNotifications.length > 0 && (
            <div>
              {filteredNotifications.map((notification) => (
                <NotificationCard
                  key={notification._id}
                  notification={notification}
                  onClick={() => handleNotificationClick(notification)}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDeleteNotification}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
