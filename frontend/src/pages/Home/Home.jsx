import React from 'react';
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/NavBar.jsx";
import CompleteProfileModal from "../../components/profile/CompleteProfileModal";
const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const showCompleteProfile =
  user?.authProvider === "google" &&
  !user?.phoneNumber;
  return (    
    <>
    <Navbar />

     <main className="pt-20">
    <h1>Home</h1>


  </main>

   {showCompleteProfile && (
      <CompleteProfileModal />
    )}
    </>
  )
}

export default Home

