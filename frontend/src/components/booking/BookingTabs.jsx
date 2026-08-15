const BookingTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-8 border-b border-gray-200">
      <div className="flex gap-8">

        {/* My Bookings */}
        <button
          type="button"
          onClick={() => setActiveTab("my-bookings")}
          className={`relative pb-3 text-sm font-semibold transition ${
            activeTab === "my-bookings"
              ? "text-blue-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          My Bookings

          {activeTab === "my-bookings" && (
            <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
          )}
        </button>

        {/* Service Bookings */}
        <button
          type="button"
          onClick={() => setActiveTab("service-bookings")}
          className={`relative pb-3 text-sm font-semibold transition ${
            activeTab === "service-bookings"
              ? "text-blue-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Service Bookings

          {activeTab === "service-bookings" && (
            <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
          )}
        </button>

      </div>
    </div>
  );
};

export default BookingTabs;