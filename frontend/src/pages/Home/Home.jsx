import React from 'react';
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/NavBar.jsx";
import { useNavigate } from "react-router-dom";
import CompleteProfileModal from "../../components/profile/CompleteProfileModal";
import plumberImage from "../../assets/plumber.jpg";
import ac_repairImage from "../../assets/ac-repair.jpg";
import painterImage from "../../assets/painter.jpg";
import electricianImage from "../../assets/electrician.jpg";
import cleanerImage from "../../assets/cleaner.jpg";


const Home = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const showCompleteProfile =
    user?.authProvider === "google" &&
    !user?.phoneNumber;

  return (
    <>
      <Navbar />

      <main className="pt-20">

        {/* ================= HERO SECTION ================= */}
        <section className="min-h-[calc(100vh-80px)] flex items-center px-6 md:px-12 lg:px-20 py-12">

          <div className="max-w-7xl mx-auto w-full">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* ================= LEFT CONTENT ================= */}
              <div className="max-w-xl">

                <p className="text-[#2563EB] font-semibold text-sm md:text-base mb-4 tracking-wide">
                  LOCAL SERVICES. MADE SIMPLE.
                </p>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1]">
                  Find trusted
                  <span className="text-[#2563EB]"> local professionals </span>
                  near you.
                </h1>

                <p className="mt-6 text-slate-600 text-base md:text-lg leading-7 max-w-lg">
                  Connect with skilled local service providers for your
                  everyday needs. From repairs to home services, find the
                  right person for the job.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap gap-4">

                  <button
                  onClick={() => navigate("/services")}
                    className="
                      bg-[#2563EB]
                      text-white
                      px-6
                      py-3
                      rounded-xl
                      font-semibold
                      hover:bg-[#1D4ED8]
                      transition-all
                      duration-200
                      shadow-sm
                    "
                  >
                    Find a Service
                  </button>

                  <button
                    onClick={() => navigate("/become-provider")}
                    className="
                      border
                      border-slate-300
                      text-slate-700
                      px-6
                      py-3
                      rounded-xl
                      font-semibold
                      hover:border-[#2563EB]
                      hover:text-[#2563EB]
                      transition-all
                      duration-200
                    "
                  >
                    Become a Provider
                  </button>

                </div>

                {/* Small trust information */}
                <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-500">

                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#2563EB] rounded-full"></span>
                    Local Professionals
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#2563EB] rounded-full"></span>
                    Easy Booking
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#2563EB] rounded-full"></span>
                    Nearby Services
                  </div>

                </div>

              </div>


              {/* ================= RIGHT IMAGE COLLAGE ================= */}
              <div className="w-full">

                <div className="grid grid-cols-2 gap-3 h-[500px]">

                  {/* Large Image */}
                  <div className="row-span-2 overflow-hidden rounded-2xl">
                    <img
                      src={electricianImage}
                      alt="Local electrician providing service"
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-500
                      "
                    />
                  </div>


                  {/* Top Right */}
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={ac_repairImage}
                      alt="Local AC service professional"
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-500
                      "
                    />
                  </div>


                  {/* Bottom Right */}
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={painterImage}
                      alt="Local painter providing service"
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-500
                      "
                    />
                  </div>

                </div>


                {/* Small Floating Images */}
                <div className="flex gap-3 mt-3">

                  <div className="w-1/2 h-32 overflow-hidden rounded-2xl">
                    <img
                      src={plumberImage}
                      alt="Local plumber professional"
                      className="
                        w-full
                        h-full
                        object-cover
                        object-[center_20%]
                        transition-transform
                        duration-500
                      "
                    />
                  </div>

                  <div className="w-1/2 h-32 overflow-hidden rounded-2xl">
                    <img
                      src={cleanerImage}
                      alt="Local cleaning professional"
                      className="
                        w-full
                        h-full
                        object-cover
                        object-[center_30%]
                        transition-transform
                        duration-500
                      "
                    />
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>


      
      


      {/* Existing profile modal */}
      {showCompleteProfile && (
        <CompleteProfileModal />
      )}

    </>
  );
};

export default Home;





// import React from 'react';
// import { useSelector } from "react-redux";
// import Navbar from "../../components/navbar/NavBar.jsx";
// import CompleteProfileModal from "../../components/profile/CompleteProfileModal";
// const Home = () => {
//   const user = useSelector((state) => state.auth.user);
//   const showCompleteProfile =
//   user?.authProvider === "google" &&
//   !user?.phoneNumber;
//   return (    
//     <>
//     <Navbar />

//      <main className="pt-20">
//     <h1>Home</h1>


//   </main>

//    {showCompleteProfile && (
//       <CompleteProfileModal />
//     )}
//     </>
//   )
// }

// export default Home

