import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { checkAuthentication } from "./features/auth/authThunks";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const dispatch = useDispatch();

    useEffect(() => {
    dispatch(checkAuthentication());
}, [dispatch]);

  return <AppRoutes />;
}

export default App;