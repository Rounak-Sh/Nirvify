import React from "react";

const AdminLanding = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 h-screen overflow-y-scroll">
        <div className="flex flex-col items-center justify-center h-full p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome to the Nirvify Admin Panel
          </h1>
          <p className="text-lg text-gray-600 mb-4 text-center">
            Manage your podcasts, episodes, and users seamlessly. Use the
            sidebar to navigate through different sections.
          </p>
          <div className="mt-6 flex flex-col items-center">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-lg shadow-lg text-white mb-4 w-full text-center">
              <h2 className="text-xl font-semibold">Get Started</h2>
              <p className="text-sm">Select an option from the sidebar.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLanding;
