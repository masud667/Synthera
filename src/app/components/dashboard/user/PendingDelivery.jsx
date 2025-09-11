"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapPin, XCircle } from "lucide-react";

const pendingDeliveries = [
  {
    id: 201,
    name: "Wireless Bluetooth Headphones",
    price: 90,
    expectedDate: "2025-09-10",
    status: "In Transit",
    image: "https://i.ibb.co/2vb2QLs/3.jpg",
  },
  {
    id: 202,
    name: "4K Ultra HD Smart TV",
    price: 450,
    expectedDate: "2025-09-12",
    status: "Pending",
    image: "https://i.ibb.co/2vb2QLs/3.jpg",
  },
  {
    id: 203,
    name: "Gaming Keyboard & Mouse Combo",
    price: 75,
    expectedDate: "2025-09-14",
    status: "Pending",
    image: "https://i.ibb.co/2vb2QLs/3.jpg",
  },
];

export default function PendingDelivery() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#173e72] rounded-xl shadow-lg p-6 overflow-x-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-white">Pending Deliveries</h2>

      {/* Table */}
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-[#2564b6] text-left text-gray-300">
            <th className="p-3">Product</th>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Expected Delivery</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingDeliveries.map((item, index) => (
            <motion.tr
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border-b last:border-none bg-[#1b4a88] hover:bg-[#1f569c] transition-colors text-gray-200"
            >
              {/* Product Image */}
              <td className="p-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </td>

              {/* Product Name */}
              <td className="p-3 font-medium">{item.name}</td>

              {/* Price */}
              <td className="p-3 text-yellow-500 font-semibold">
                ${item.price}
              </td>

              {/* Expected Delivery Date */}
              <td className="p-3 text-gray-400">{item.expectedDate}</td>

              {/* Status */}
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.status === "Pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              {/* Actions */}
              <td className="p-3 text-center">
                <div className="flex justify-end gap-3">
                  <button className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition">
                    <MapPin size={18} />
                    Track
                  </button>
                  <button className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition">
                    <XCircle size={18} />
                    Cancel
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* Summary Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-6 flex justify-between items-center bg-[#296dc5] p-4 rounded-lg"
      >
        <span className="font-semibold text-gray-300">
          Total Pending:{" "}
          <span className="text-yellow-500">{pendingDeliveries.length}</span>
        </span>
        <span className="text-lg font-bold text-gray-200">
          Estimated Deliveries:{" "}
          <span className="text-green-400">{pendingDeliveries.length}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}
