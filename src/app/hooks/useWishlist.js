"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function useWishlist() {
  const { data: session } = useSession();

  const addToWishlist = async (product) => {
    if (!session) {
      toast.error("Please login first!");
      return;
    }

    const wishlistItem = {
      userEmail: session.user.email,
      productId: product.productId,
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.discountPrice,
    };

    try {
      const { data } = await axios.post("/api/wishlistItems", wishlistItem);
      if (data.success) {
        toast.success("Added to wishlist!");
      } else {
        toast.error("Failed to add to wishlist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to wishlist");
    }
  };

  return { addToWishlist };
}
