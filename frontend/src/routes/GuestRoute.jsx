import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsAuthenticated,selectLoading  } from "../features/auth/authSelectors";

const GuestRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);

  if (loading) {
    return <div>Loading...</div>; // or your spinner
  }
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;