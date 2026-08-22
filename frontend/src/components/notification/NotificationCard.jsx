import { useState, useEffect } from "react";
import {
  FaBell,
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
  FaEdit,
  FaBriefcase,
  FaLock,
} from "react-icons/fa";

const NotificationCard = ({
  notification,
  onClick,
  onMarkAsRead,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  if (!notification) return null;

  useEffect(() => {
    const handleClickOutside = () => {
      setShowMenu(false);
    };

    if (showMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  // ==========================================
  // Notification Icon
  // ==========================================

  const getNotificationIcon = () => {
    switch (notification.type) {
      case "booking_request":
        return <FaCalendarCheck />;

      case "booking_confirmed":
        return <FaCheckCircle />;

      case "booking_rejected":
        return <FaTimesCircle />;

      case "booking_cancelled":
        return <FaTimesCircle />;

      case "booking_updated":
        return <FaEdit />;

      case "review_reminder":
        return <FaBell />;

      case "new_review":
        return <FaStar />;

      case "otp_generated":
        return <FaLock />;

      case "subscription":
        return <FaCreditCard />;

      case "payment":
        return <FaRupeeSign />;

      case "system":
      default:
        return <FaBell />;
    }
  };

  // ==========================================
  // Time Ago
  // ==========================================

  const getTimeAgo = (date) => {
    if (!date) return "";

    const now = new Date();
    const createdAt = new Date(date);

    const difference = Math.floor((now - createdAt) / 1000);

    if (difference < 60) {
      return "Just now";
    }

    const minutes = Math.floor(difference / 60);

    if (minutes < 60) {
      return `${minutes}m`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours}h`;
    }

    const days = Math.floor(hours / 24);

    if (days < 7) {
      return `${days}d`;
    }

    const weeks = Math.floor(days / 7);

    if (weeks < 4) {
      return `${weeks}w`;
    }

    return createdAt.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // Handle Click
  // ==========================================

  const handleClick = () => {
    if (!notification.isRead) {
      onMarkAsRead?.(notification._id);
    }

    onClick?.(notification);
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative flex cursor-pointer gap-4 border-b border-gray-100 px-5 py-4 transition ${
        notification.isRead
          ? "bg-white hover:bg-gray-50"
          : "bg-blue-50/60 hover:bg-blue-50"
      }`}
    >
      {/* ======================================
          Unread Indicator
      ====================================== */}

      {!notification.isRead && (
        <span className="absolute left-2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-blue-600" />
      )}

      {/* ======================================
          Avatar / Icon
      ====================================== */}

      <div className="relative shrink-0">
        {notification.sender?.avatar ? (
          <img
            src={notification.sender.avatar}
            alt={notification.sender.fullName || "User"}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            {getNotificationIcon()}
          </div>
        )}

        {/* Small notification icon */}

        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-[9px] text-white">
          {getNotificationIcon()}
        </div>
      </div>

      {/* ======================================
          Content
      ====================================== */}

      <div className="min-w-0 flex-1 pr-8">
        <p
          className={`text-sm leading-5 ${
            notification.isRead ? "text-gray-700" : "font-medium text-gray-900"
          }`}
        >
          {notification.message}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          {getTimeAgo(notification.createdAt)}
        </p>
      </div>

      {/* ==========================================
    More / Delete Menu
========================================== */}

      <div className="absolute right-4 top-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu((prev) => !prev);
          }}
          title="More options"
          className="
      flex
      h-8
      w-8
      items-center
      justify-center
      rounded-full
      text-gray-400
      opacity-0
      transition
      hover:bg-gray-200
      hover:text-gray-600
      group-hover:opacity-100
    "
        >
          <span className="text-lg leading-none">⋯</span>
        </button>

        {showMenu && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="
        absolute
        right-10
        top-0
        z-50
        w-32
        overflow-hidden
        rounded-lg
        border
        border-gray-100
        bg-white
        py-1
        shadow-lg
      "
          >
            <button
              type="button"
              onClick={() => {
                setShowMenu(false);
                onDelete?.(notification._id);
              }}
              className="
          flex
          w-full
          items-center
          px-4
          py-2
          text-left
          text-sm
          text-red-500
          transition
          hover:bg-red-50
        "
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
