import { Outlet } from "react-router-dom";

import Navbar from "../navbar/NavBar";
import Footer from "../footer/Footer";

const MainLayout = () => {
    return (
        <>
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default MainLayout;