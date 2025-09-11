"use client";
import React from "react";
import { motion } from "framer-motion";
import { Eye, XCircle } from "lucide-react";

const orders = [
  {
    id: 101,
    name: "Premium Leather Jacket",
    price: 120,
    date: "2025-08-30",
    status: "Delivered",
    image: "https://i.ibb.co/HKff8zH/29.jpg",
  },
  {
    id: 102,
    name: "Smart Casual Sneakers",
    price: 75,
    date: "2025-09-01",
    status: "Pending",
    image: "https://i.ibb.co/HKff8zH/29.jpg",
  },
  {
    id: 103,
    name: "Classic Denim Jeans",
    price: 50,
    date: "2025-09-03",
    status: "Shipped",
    image: "https://i.ibb.co/HKff8zH/29.jpg",
  },
];

export default function OrderedItems() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#173e72] rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-white">Your Orders</h2>

      {/* Table layout for XL screens */}
      <div className="hidden xl:block">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[#2564b6] text-left text-gray-300">
              <th className="p-3">Product</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Order Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border-b last:border-none bg-[#1b4a88] hover:bg-[#1f569c] transition-colors text-gray-200"
              >
                <td className="p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </td>
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3 text-yellow-500 font-semibold">${item.price}</td>
                <td className="p-3 text-gray-400">{item.date}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "Delivered"
                        ? "bg-green-500 text-white"
                        : item.status === "Pending"
                        ? "bg-yellow-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <div className="flex justify-end gap-3 flex-wrap">
                    <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition">
                      <Eye size={18} /> View
                    </button>
                    <button className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition">
                      <XCircle size={18} /> Cancel
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile / Small screens: stacked card layout */}
      <div className="xl:hidden flex flex-col gap-4">
        {orders.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-[#1b4a88] p-4 rounded-lg shadow hover:bg-[#1f569c] transition-colors text-gray-200"
          >
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-1">
                <h3 className="font-medium text-lg">{item.name}</h3>
                <p className="text-yellow-500 font-semibold">${item.price}</p>
                <p className="text-gray-400 text-sm">Order: {item.date}</p>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    item.status === "Delivered"
                      ? "bg-green-500 text-white"
                      : item.status === "Pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2 flex-wrap">
              <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition">
                <Eye size={18} /> View
              </button>
              <button className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition">
                <XCircle size={18} /> Cancel
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-6 flex flex-col xl:flex-row justify-between items-start xl:items-center bg-[#296dc5] p-4 rounded-lg gap-2"
      >
        <span className="font-semibold text-gray-300">
          Total Orders:
          <span className="text-yellow-500"> {orders.length}</span>
        </span>
        <span className="text-lg font-bold text-gray-200">
          Delivered:
          <span className="text-green-400">
            {" "}
            {orders.filter((o) => o.status === "Delivered").length}
          </span>
        </span>
      </motion.div>
    </motion.div>
  );
}
