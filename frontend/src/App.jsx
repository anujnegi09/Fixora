import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { checkAuthentication } from "./features/auth/authThunks";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const dispatch = useDispatch();
  const authCheckStarted = useRef(false);

  useEffect(() => {
    if (authCheckStarted.current) return;
    authCheckStarted.current = true;
    dispatch(checkAuthentication());
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;
