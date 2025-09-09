"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function useCart() {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchCart = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/cart?email=${session.user.email}`);
        setCartItems(data.cartItems || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [session?.user?.email]);

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`/api/cart/${itemId}`);
      setCartItems((prev) => prev.filter((item) => item._id !== itemId));
      toast.success("Item removed from cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  return { cartItems, loading, removeItem };
}
