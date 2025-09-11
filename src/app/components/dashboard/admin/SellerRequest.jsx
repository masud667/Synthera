"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Trash2 } from "lucide-react";

const sellerRequests = [
  {
    id: 1,
    name: "John Smith",
    email: "johnsmith@example.com",
    date: "2025-09-06",
    image: "https://i.ibb.co/S5p5FzT/5.jpg",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "janedoe@example.com",
    date: "2025-09-05",
    image: "https://i.ibb.co/S5p5FzT/5.jpg",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michaelbrown@example.com",
    date: "2025-09-04",
    image: "https://i.ibb.co/S5p5FzT/5.jpg",
  },
];

export default function SellerRequest() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#173e72] rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-white">Seller Requests</h2>

      {/* Table layout for XL screens */}
      <div className="hidden xl:block">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[#2564b6] text-left text-gray-200">
              <th className="p-3">Seller</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Request Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellerRequests.map((seller, index) => (
              <motion.tr
                key={seller.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border-b last:border-none bg-[#1b4a88] hover:bg-[#1f569c] transition-colors text-gray-200"
              >
                <td className="p-3">
                  <img
                    src={seller.image}
                    alt={seller.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
                  />
                </td>
                <td className="p-3 font-medium">{seller.name}</td>
                <td className="p-3">{seller.email}</td>
                <td className="p-3 text-gray-300">{seller.date}</td>
                <td className="p-3 text-center">
                  <div className="flex justify-end gap-3 flex-wrap">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="bg-green-500 cursor-pointer text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition"
                    >
                      <CheckCircle size={18} /> Approve
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="bg-red-500 cursor-pointer text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition"
                    >
                      <Trash2 size={18} /> Delete
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile layout: stacked cards */}
      <div className="xl:hidden flex flex-col gap-4">
        {sellerRequests.map((seller, index) => (
          <motion.div
            key={seller.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-[#1b4a88] p-4 rounded-lg shadow hover:bg-[#1f569c] transition-colors text-gray-200"
          >
            <div className="flex items-center gap-4">
              <img
                src={seller.image}
                alt={seller.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
              />
              <div className="flex-1">
                <h3 className="font-medium text-lg">{seller.name}</h3>
                <p className="text-gray-300 text-sm">{seller.email}</p>
                <p className="text-gray-400 text-sm">
                  Request Date: {seller.date}
                </p>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-green-500 cursor-pointer text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition"
              >
                <CheckCircle size={18} /> Approve
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-red-500 cursor-pointer text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition"
              >
                <Trash2 size={18} /> Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-6 flex justify-between items-center bg-[#296dc5] p-4 rounded-lg"
      >
        <span className="font-semibold text-gray-200">
          Total Requests:{" "}
          <span className="text-yellow-400">{sellerRequests.length}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}
