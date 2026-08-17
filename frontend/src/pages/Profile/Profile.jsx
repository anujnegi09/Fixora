import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Button from "../../components/common/Button";

import { getProfile } from "../../features/user/userThunks";
import {
  selectProfile,
  selectUserLoading,
} from "../../features/user/userSelectors";
import UpdateProfileModal from "../../components/user/UpdateProfileModal.jsx";
import ChangePasswordModal from "../../components/user/ChangePasswordModal";

const Profile = () => {
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectProfile);
  const loading = useSelector(selectUserLoading);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Header */}

        <div className="bg-white rounded-2xl shadow p-8 flex flex-col md:flex-row gap-8 items-center">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
            />
          ) : (
            <FaUserCircle size={160} className="text-gray-400" />
          )}

          <div className="flex-1">
            <h1 className="text-4xl font-bold">{user?.fullName}</h1>

            <p className="text-gray-500 text-lg">@{user?.userName}</p>

            <div className="flex gap-4 mt-4 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                {user?.subscription?.plan || "Free Plan"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button size="sm" onClick={() => setShowUpdateProfile(true)}>
              Update Profile
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowChangePassword(true)}
            >
              Change Password
            </Button>
          </div>
        </div>

        {/* Personal Information */}

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>

            <div className="space-y-5">
              <div>
                <h4 className="font-semibold">Email</h4>

                <p>{user?.email}</p>
              </div>

              <div>
                <h4 className="font-semibold">Phone Number</h4>

                <p>{user?.phoneNumber || "Not Added"}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="secondary"
                onClick={() => navigate("/my-bookings")}
              >
                My Bookings
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate("/my-services")}
              >
                My Services
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate("/subscription")}
              >
                Subscription
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate("/become-provider")}
              >
                Become Provider
              </Button>

              <Button variant="secondary" onClick={() => navigate("/settings")}>
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Update Profile Modal */}
      {showUpdateProfile && (
        <UpdateProfileModal onClose={() => setShowUpdateProfile(false)} />
      )}
      {/* change password Modal */}
      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}
    </>
  );
};

export default Profile;
