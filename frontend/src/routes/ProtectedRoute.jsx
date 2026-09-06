import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/common/Loading.jsx";
import { selectIsAuthenticated ,selectLoading} from "../features/auth/authSelectors";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);
  if(loading){
    return <Loading fullScreen text="loading" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;