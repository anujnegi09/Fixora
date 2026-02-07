import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Homepage from "./pages/HomePage";
import About from "./pages/About";
import ServiceProviderPage from "./pages/ServiceProviderPage";
import LoginPage from "./pages/LoginPage";
import Services from "./pages/Services";



// Inner component to handle footer visibility
const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/LoginPage" ];
  const hideFooterRoutes = ["/LoginPage" ];

  return (
    <>
      <ScrollToTop />
       {!hideNavbarRoutes.includes(location.pathname) && <NavBar />}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/ServiceProviderPage" element={<ServiceProviderPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
      </Routes>
     
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

const App = () => {
  return (
    
     
        
          <AppContent />
       
  

  );
};

export default App;



  
