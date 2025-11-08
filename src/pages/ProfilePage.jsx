import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-6">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl rounded-2xl p-8 border border-gray-200">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-full overflow-hidden  border-primary shadow-lg">
            <img
              src="/sample1.jpg" // ✅ Using your public image
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-3xl font-bold mt-4 capitalize text-secondary">
            {user.name}
          </h2>
          <p className="text-sm text-gray-600 mt-1 px-3 py-1 rounded-full bg-base-300 inline-block">
            {user.role === "admin" ? "🛠️ Admin" : "👤 User"}
          </p>
        </div>

        {/* Divider */}
        <div className="divider my-6"></div>

        {/* User Details */}
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-blue-600">Email</span>
            <span className="font-medium text-primary">{user.email}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-green-600">Contributions</span>
            <span className="font-medium text-success">{user.contributions}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-red-600">Score</span>
            <span className="font-medium text-success">{user.score}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => navigate("/contribute")}
            className="btn btn-primary w-full"
          >
            ✍️ Make a Contribution
          </button>
          <button
            onClick={() => navigate("/")}
            className="btn btn-outline w-full"
          >
            ⬅️ Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
