import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { checkAuthentication } from "./features/auth/authThunks";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const dispatch = useDispatch();
   const location = useLocation();

  console.log("CURRENT PATH:", location.pathname);
    useEffect(() => {
       console.log("CHECK AUTH STARTED ON:", location.pathname);
    dispatch(checkAuthentication());
}, [dispatch]);

  return <AppRoutes />;
}

export default App;