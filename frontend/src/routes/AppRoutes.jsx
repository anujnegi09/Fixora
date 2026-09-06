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
import BecomeProvider from "../pages/BecomeProvider/BecomeProvider";
import Services from "../pages/Services/Services.jsx";
import CreateService from "../pages/CreateService/CreateService.jsx";
import BookService from "../pages/Booking/BookService.jsx";
import Bookings from "../pages/booking/Bookings";
import Notifications from "../pages/Notifications/Notifications";
import Subscription from "../pages/Subscription/Subscription";
import Reviews from "../pages/Review/Reviews.jsx"
import About from "../pages/About/About.jsx";
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

        <Route path="/services" element={<Services />} />

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
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reviews"
          element={
            <ProtectedRoute>
              <Reviews />
            </ProtectedRoute>
          }
        />


        <Route
        path="/about"
        element={
            <About />
         } 
      />


      </Route>

      <Route
        path="/booking/:serviceId"
        element={
          <ProtectedRoute>
            <BookService />
          </ProtectedRoute>
        }
      />

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

      <Route path="/auth/google/success" element={<GoogleSuccess />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
