import { Outlet } from "react-router-dom";

import Navbar from "../navbar/NavBarNew";
import Footer from "../footer/FooterNew";
import PageTransition from "./PageTransition";

const MainLayout = () => {
    return (
        <>
            <Navbar />

            <main className="min-h-screen">
                <PageTransition>
                    <Outlet />
                </PageTransition>
            </main>

            <Footer />
        </>
    );
};

export default MainLayout;
