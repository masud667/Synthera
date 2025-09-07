"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

// Mock data
const usersData = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alicej@example.com",
    date: "2025-09-01",
  },
  {
    id: 2,
    name: "Bob Williams",
    email: "bobw@example.com",
    date: "2025-09-03",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlieb@example.com",
    date: "2025-09-05",
  },
  {
    id: 4,
    name: "Diana Smith",
    email: "dianas@example.com",
    date: "2025-09-06",
  },
];

export default function TotalUsers() {
  const [search, setSearch] = useState("");
  const [sortRecent, setSortRecent] = useState(false);

  // Filtered and sorted users
  const filteredUsers = usersData
    .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortRecent
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#173e72] rounded-xl shadow-lg p-6 overflow-x-auto"
    >
      {/* Top Summary */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-white">
          Total Users:{" "}
          <span className="text-yellow-400">{usersData.length}</span>
        </h2>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name..."
            className="p-3 rounded-lg border border-gray-300 focus:outline-none w-full md:w-64 placeholder:text-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-3 rounded-lg border text-gray-400 border-gray-300 focus:outline-none w-full md:w-48"
            value={sortRecent}
            onChange={(e) => setSortRecent(e.target.value === "true")}
          >
            <option value={false}>Oldest First</option>
            <option value={true}>Most Recent First</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-[#2564b6] text-left text-gray-200">
            <th className="p-3">User Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Registered Date</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <motion.tr
              key={user.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border-b last:border-none bg-[#1b4a88] hover:bg-[#1f569c] transition-colors text-gray-200"
            >
              <td className="p-3 font-medium">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3 text-gray-300">{user.date}</td>
              <td className="p-3 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-red-500 cursor-pointer text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition"
                >
                  <Trash2 size={18} />
                  Delete User
                </motion.button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* No users found */}
      {filteredUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center text-gray-200"
        >
          No users found.
        </motion.div>
      )}
    </motion.div>
  );
}
