"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import axios from "axios";

export default function TotalSellers() {
  const [search, setSearch] = useState("");
  const [sortRecent, setSortRecent] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users");
        setUser(res.data.users);
      } catch (err) {
        console.error(
          "Error fetching user:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const totalSeller = user?.filter((res) => res.role === "seller") || [];

  // Filtered and sorted sellers
  const filteredSellers = totalSeller
    .filter((seller) =>
      seller.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortRecent
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  if (loading)
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
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
          Total Sellers:{" "}
          <span className="text-yellow-400">{totalSeller.length}</span>
        </h2>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name..."
            className="p-3 rounded-lg border placeholder:text-gray-400 border-gray-300 focus:outline-none w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-3 text-gray-400 rounded-lg border border-gray-300 focus:outline-none w-full md:w-48"
            value={sortRecent}
            onChange={(e) => setSortRecent(e.target.value === "true")}
          >
            <option value={false}>Oldest First</option>
            <option value={true}>Most Recent First</option>
          </select>
        </div>
      </div>

      {/* Table layout for XL screens */}
      <div className="hidden xl:block">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[#2564b6] text-left text-gray-200">
              <th className="p-3">Seller Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Approval Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSellers.map((seller, index) => (
              <motion.tr
                key={seller._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border-b last:border-none bg-[#1b4a88] hover:bg-[#1f569c] transition-colors text-gray-200"
              >
                <td className="p-3 font-medium">{seller.name}</td>
                <td className="p-3">{seller.email}</td>
                <td className="p-3 text-gray-300">
                  {seller.createdAt.slice(0, 10)}
                </td>
                <td className="p-3 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-yellow-400 cursor-pointer text-gray-900 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-500 transition"
                  >
                    <MessageCircle size={18} /> Message
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile layout: stacked cards */}
      <div className="xl:hidden flex flex-col gap-4">
        {filteredSellers.map((seller, index) => (
          <motion.div
            key={seller._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-[#1b4a88] p-4 rounded-lg shadow hover:bg-[#1f569c] transition-colors text-gray-200"
          >
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-lg">{seller.name}</h3>
              <p className="text-gray-300 text-sm">{seller.email}</p>
              <p className="text-gray-400 text-sm">
                Approval Date: {seller.createdAt.slice(0, 10)}
              </p>
              <div className="mt-2 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-yellow-400 cursor-pointer text-gray-900 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-500 transition"
                >
                  <MessageCircle size={18} /> Message
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No sellers found */}
      {filteredSellers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center text-gray-200"
        >
          No sellers found.
        </motion.div>
      )}
    </motion.div>
  );
}
