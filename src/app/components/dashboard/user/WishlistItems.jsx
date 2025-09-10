"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trash2, ShoppingBag } from "lucide-react";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAddToCart from "@/app/hooks/useAddToCart";
import useWishlist from "@/app/hooks/useWishlist";

export default function WishlistItems() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { addToCart } = useAddToCart();
  const { removeFromWishlist } = useWishlist();

  // ✅ Fetch wishlist items (TanStack v5 style)
  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ["wishlist", session?.user?.email],
    queryFn: async () => {
      const res = await axios.get(`/api/wishlistItems?email=${session?.user?.email}`);
      return res.data.wishlistItems || [];
    },
    enabled: !!session?.user?.email,
  });

  const handleMoveToCart = async (item) => {
    await addToCart(item, item.size || "M", item.quantity || 1);
    await removeFromWishlist(item._id);
    queryClient.invalidateQueries(["wishlist", session?.user?.email]);
  };

  if (!session) return <p className="p-4 text-gray-500">Please login to view your wishlist.</p>;
  if (isLoading) return <p>Loading wishlist...</p>;
  if (!wishlistItems.length) return <p>Your wishlist is empty</p>;

  return (
    <motion.div className="bg-[#173e72] rounded-xl shadow-lg p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Your Wishlist</h2>

      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-[#2564b6] text-left text-gray-600">
            <th className="p-3">Product</th>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Added On</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wishlistItems.map((item, index) => (
            <motion.tr
              key={item._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border-b last:border-none bg-[#1b4a88] hover:bg-[#1f569c] transition-colors text-gray-200"
            >
              <td className="p-3">
                <img src={item.thumbnail} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
              </td>
              <td className="p-3 font-medium">{item.title}</td>
              <td className="p-3 text-yellow-600 font-semibold">${item.price}</td>
              <td className="p-3 text-gray-400">{new Date(item.addedAt || Date.now()).toLocaleDateString()}</td>
              <td className="p-3 text-center">
                <div className="flex justify-end gap-3">
                  <motion.button
                    onClick={() => handleMoveToCart(item)}
                    className="bg-green-500 text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition"
                  >
                    <ShoppingBag size={18} />
                    Move to Cart
                  </motion.button>
                  <motion.button
                    onClick={async () => {
                      await removeFromWishlist(item._id);
                      queryClient.invalidateQueries(["wishlist", session?.user?.email]);
                    }}
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
    </motion.div>
  );
}
