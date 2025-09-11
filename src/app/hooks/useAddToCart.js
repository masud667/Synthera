import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

export default function useAddToCart() {
  const { data: session } = useSession();

  const addToCart = async (product, selectedSize, quantity) => {
    if (!session) {
      toast.error("Please login first!");
      return;
    }

    const cartItem = {
      userEmail: session.user.email,
      productId: product.productId,
      title: product.title,
      thumbnail: product.thumbnail,
      size: selectedSize,
      quantity,
      price: product.price || product.discountPrice,
    };

    try {
      const { data } = await axios.post("/api/cart", cartItem);
      if (data.success) {
        toast.success(`Added ${quantity} x ${product.title} to cart!`);
      } else {
        toast.error("Failed to add to cart");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  return { addToCart };
}
