import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "../pages/ResetPassword/ResetPassword.jsx";
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail.jsx";
import GoogleSuccess from "../pages/GoogleSuccess/GoogleSuccess.jsx";
import ChangePassword from "../pages/ChangePassword/ChangePassword.jsx";
import BecomeProvider from "../pages/BecomeProvider/BecomeProvider";
import Services from "../pages/Services/Services.jsx";
import CreateService from "../pages/CreateService/CreateService.jsx";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import UpdateService from "../pages/UpdateService/UpdateService";


import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Routes with Navbar & Footer */}
      <Route element={<MainLayout />}>

        {/* Public Route */}
        <Route path="/" element={<Home />} />

        {/* Protected Routes */}

        {/* Get Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

         {/* change password */}
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />

        <Route
  path="/become-provider"
  element={
    <ProtectedRoute>
      <BecomeProvider />
    </ProtectedRoute>
  }
/>

        <Route
          path="/create-service"
          element={
            <ProtectedRoute>
              <CreateService />
            </ProtectedRoute>
          }
        />

        <Route
  path="/services/:serviceId"
  element={<ServiceDetails />}
/>

      <Route
  path="/update-service/:serviceId"
  element={
    <ProtectedRoute>
      <UpdateService />
    </ProtectedRoute>
  }
/>



      </Route>

      {/* Guest Routes (No Navbar/Footer) */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <GuestRoute>
            <ForgotPassword />
          </GuestRoute>
        }
      />

      <Route
        path="/reset-password/:token"
        element={
          <GuestRoute>
            <ResetPassword />
          </GuestRoute>
        }
      />

      <Route
        path="/verify-email/:token"
        element={
          <GuestRoute>
            <VerifyEmail />
          </GuestRoute>
        }
      />

      <Route
        path="/auth/google/success"
        element={<GoogleSuccess />}
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;