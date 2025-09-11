"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegEye, FaShoppingCart, FaHeart } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import useAddToCart from "@/app/hooks/useAddToCart"; 
import useWishlist from "@/app/hooks/useWishlist";

export default function ProductCard({ product }) {
  const router = useRouter();
  const { addToCart } = useAddToCart(); 
const { addToWishlist } = useWishlist();
  const {
    title,
    category,
    thumbnail,
    price,
    discountPrice,
    sizes,
    variants,
    description,
    rating,
  _id
  
  } = product;

  const [activeImage, setActiveImage] = useState(thumbnail);
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <Toaster position="top-right" />

      {/* Product Card */}
      <div className="shadow-md bg-gray-100 rounded-md w-[250px] relative group p-4 cursor-pointer">
        <div className="relative bg-[#E1E4E9] rounded-md p-3">
          <img src={activeImage} alt={title} className="w-full h-[250px] object-contain" />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition bg-black/40 rounded-md">
            {/* Eye icon → go to details page */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/Products/${_id}`);
              }}
              className="bg-white p-2 rounded-full hover:scale-110 transition"
            >
              <FaRegEye className="text-gray-800" />
            </button>

            {/* Cart icon → open modal */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className="bg-white p-2 rounded-full hover:scale-110 transition"
            >
              <FaShoppingCart className="text-gray-800" />
            </button>
          </div>
        </div>

        {/* Category & Title */}
        <div className="flex justify-between text-gray-500 text-sm mt-2">
          <span className="uppercase">{category}</span>
          <span>{sizes.join(" ")}</span>
        </div>
        <h3 className="font-semibold text-gray-800 mt-1" onClick={() => router.push(`/Products/${productId}`)}>
          {title}
        </h3>

        {/* Price*/}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-bold text-black">${discountPrice}</span>
          {discountPrice < price && <span className="line-through text-gray-400">${price}</span>}
        </div>

        {/* Variants + Wishlist */}
        <div className="flex items-center gap-2 mt-2">
          {variants?.map((variant, idx) => (
            <button
              key={idx}
              className="w-6 h-6 rounded-full border hover:scale-110 transition"
              style={{ backgroundColor: variant.color.toLowerCase() }}
              onMouseEnter={() => setActiveImage(variant.image)}
              onMouseLeave={() => setActiveImage(thumbnail)}
            />
          ))}
         <button
    className="ml-auto text-gray-500 hover:text-red-500"
    onClick={(e) => {
      e.stopPropagation();
      addToWishlist(product); 
    }}
  >
    <FaHeart />
  </button>
        </div>
      </div>

      {/* Quick Add-to-Cart Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto relative">
            {/* Close button */}
            <button className="absolute top-3 right-3 text-gray-500 hover:text-black" onClick={() => setShowModal(false)}>
              ✕
            </button>

            <div className="grid grid-cols-2 gap-6">
              {/* Left: Image */}
              <div>
                <img src={activeImage} alt={title} className="w-full h-[250px] object-contain rounded" />
              </div>

              {/* Right: Info */}
              <div>
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-gray-600 mt-2">{description}</p>

                {/* Rating */}
                {rating && (
                  <p className="mt-2 text-yellow-500">
                    ⭐ {rating.average} ({rating.count})
                  </p>
                )}

                {/* Price */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold">${discountPrice}</span>
                  {discountPrice < price && <span className="line-through text-gray-400">${price}</span>}
                </div>

                {/* Sizes */}
                <div className="mt-4">
                  <p className="font-semibold">Select Size:</p>
                  <div className="flex gap-2 mt-1">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1 border rounded ${selectedSize === s ? "bg-black text-white" : "hover:bg-gray-200"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2 mt-4">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-1 border rounded">
                    -
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-1 border rounded">
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(product, selectedSize, quantity)} 
                  className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
