const ReviewTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-8 border-b border-gray-200">
      <div className="flex gap-8">

        {/* My Reviews */}

        <button
          type="button"
          onClick={() => setActiveTab("my-reviews")}
          className={`relative pb-3 text-sm font-semibold transition ${
            activeTab === "my-reviews"
              ? "text-blue-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          My Reviews

          {activeTab === "my-reviews" && (
            <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
          )}
        </button>

        {/* My Service Reviews */}

        <button
          type="button"
          onClick={() => setActiveTab("my-service-reviews")}
          className={`relative pb-3 text-sm font-semibold transition ${
            activeTab === "my-service-reviews"
              ? "text-blue-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          My Service Reviews

          {activeTab === "my-service-reviews" && (
            <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
          )}
        </button>

      </div>
    </div>
  );
};

export default ReviewTabs;
