"use client";
import React from "react";
import { motion } from "framer-motion";
import { Trash2, ShoppingBag } from "lucide-react";
import useCart from "@/app/hooks/useCart";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function AllCart() {
  const { cartItems, loading, removeItem } = useCart();
  const { data: session } = useSession();

  if (!session) {
    return <p className="p-4 text-gray-500">Please login to view your cart.</p>;
  }

  if (loading) return <p className="p-4 text-gray-500">Loading cart...</p>;
  if (!cartItems.length)
    return <p className="p-4 text-gray-500">Your cart is empty</p>;

  const handleRemove = async (id) => {
    try {
      await removeItem(id);
      toast.success("Product removed from cart!");
    } catch (error) {
      toast.error("Failed to remove product.");
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#173e72] rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-white">Your Cart</h2>

      {/* Table for XL screens */}
      <div className="hidden xl:block">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[#2564b6] text-left text-gray-200">
              <th className="p-3">Product</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Added On</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border-b last:border-none bg-[#1b4a88] hover:bg-[#1f569c] transition-colors text-gray-200"
              >
                <td className="p-3">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </td>
                <td className="p-3 font-medium">{item.title}</td>
                <td className="p-3 text-yellow-600 font-semibold">
                  ${item.price}
                </td>
                <td className="p-3 text-gray-400">
                  {new Date(item.addedAt).toLocaleDateString()}
                </td>
                <td className="p-3 text-center">
                  <div className="flex justify-end gap-3 flex-wrap">
                    <motion.button className="bg-green-500 text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition">
                      <ShoppingBag size={18} />
                      Buy Now
                    </motion.button>
                    <motion.button
                      onClick={() => handleRemove(item._id)}
                      className="bg-red-500 text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition"
                    >
                      <Trash2 size={18} />
                      Remove
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile / Small screens: stacked cards */}
      <div className="xl:hidden flex flex-col gap-4">
        {cartItems.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-[#1b4a88] p-4 rounded-lg shadow hover:bg-[#1f569c] transition-colors text-gray-200"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-lg">{item.title}</h3>
                <p className="text-yellow-500 font-semibold">${item.price}</p>
                <p className="text-gray-400 text-sm">
                  Added: {new Date(item.addedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2 flex-wrap">
              <motion.button className="bg-green-500 text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition">
                <ShoppingBag size={18} />
                Buy Now
              </motion.button>
              <motion.button
                onClick={() => handleRemove(item._id)}
                className="bg-red-500 text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition"
              >
                <Trash2 size={18} />
                Remove
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Total summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-6 flex flex-col xl:flex-row justify-between items-center bg-[#296dc5] p-4 rounded-lg gap-2"
      >
        <span className="font-semibold text-gray-300">
          Total Items:{" "}
          <span className="text-yellow-500">{cartItems.length}</span>
        </span>
        <span className="text-lg font-bold text-gray-200">
          Total:{" "}
          <span className="text-yellow-500">
            ${cartItems.reduce((sum, item) => sum + item.price, 0)}
          </span>
        </span>
      </motion.div>
    </motion.div>
  );
}
