import React, { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";

// const USER_API_END_POINT = "http://localhost:5000/api/user"; // update if needed

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/top10`);
        if (res.data.success) {
          setUsers(res.data.users);
        }
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-70 py-12 px-6 flex flex-col items-center">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">
        🏆 Leaderboard
      </h1>

      {/* Table */}
      <div className="overflow-x-auto w-full max-w-4xl bg-white shadow-md rounded-2xl border border-gray-200">
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-lg">
            Loading leaderboard...
          </div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No users found 😢</div>
        ) : (
          <table className="table w-full text-center">
            <thead className="bg-gradient-to-r from-blue-100 to-indigo-100 text-gray-700 font-semibold">
              <tr>
                <th className="rounded-tl-2xl py-3">Rank</th>
                <th className="py-3">Name</th>
                <th className="py-3">Score</th>
                <th className="rounded-tr-2xl py-3">Contributions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id || index}
                  className={`transition-colors hover:bg-gray-100 ${
                    index === 0
                      ? "bg-yellow-50"
                      : index === 1
                      ? "bg-gray-50"
                      : index === 2
                      ? "bg-orange-50"
                      : "bg-white"
                  }`}
                >
                  <td className="py-3 text-gray-600 font-medium">#{index + 1}</td>
                  <td className="py-3 text-gray-800 font-semibold capitalize">
                    {user.name}
                  </td>
                  <td className="py-3 text-green-700 font-semibold">{user.score}</td>
                  <td className="py-3 text-purple-700 font-medium">
                    {user.contributions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
