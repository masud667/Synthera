"use client";
import { useState, useEffect, use } from "react";
import useAddToCart from "@/app/hooks/useAddToCart";
import useWishlist from "@/app/hooks/useWishlist";
import { Toaster } from "react-hot-toast";

export default function ProductDetails({ params:paramsPromise}) {
  const params = use(paramsPromise);  
  
  const { id } = params;

  const { addToCart } = useAddToCart();
  const { addToWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setSelectedSize(data.sizes?.[0] || "");
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <h1 className="p-6">Loading product...</h1>;
  if (!product) return <h1 className="p-6">Product not found</h1>;

  const handleQuantityChange = (value) => {
    if (value < 1) return;
    setQuantity(value);
  };

  return (
    <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <Toaster position="top-right" />

      {/* Left: Image + Thumbnails */}
      <div className="flex flex-col items-center">
        <div className="w-full md:w-[450px] h-[450px] bg-[#E1E4E9] rounded-md p-3 flex items-center justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-w-full max-h-full object-contain rounded-md"
          />
        </div>

        <div className="grid grid-cols-4 gap-3 mt-6 w-full md:w-[450px]">
          {product.images?.map((subImg, index) => (
            <div
              key={index}
              className="w-full h-24 bg-[#F5F5F5] rounded-md p-1 hover:scale-105 transition-transform cursor-pointer flex items-center justify-center"
            >
              <img
                src={subImg}
                alt={`Product Image ${index + 1}`}
                className="max-w-full max-h-full object-contain rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right: Details */}
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-500">{product.brand}</p>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-xl font-semibold text-blue-600">
            ${product.discountPrice}
          </span>
          <span className="line-through text-gray-400">${product.price}</span>
        </div>

        <p className="mt-4">{product.description}</p>

        {/* Sizes */}
        <div className="mt-4">
          <h3 className="font-semibold">Sizes</h3>
          <div className="flex gap-2 mt-2 flex-wrap">
            {product.sizes?.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 border rounded hover:bg-blue-500 hover:text-white ${
                  selectedSize === size ? "bg-blue-600 text-white" : ""
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mt-4">
          <h3 className="font-semibold">Quantity</h3>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-3 py-1 border rounded hover:bg-gray-200"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
              className="w-16 text-center border rounded"
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-3 py-1 border rounded hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-6">
          <h3 className="font-semibold">Specifications</h3>
          <ul className="list-disc pl-5 text-gray-600 mt-2">
            <li>Closure: {product.specifications?.closure}</li>
            <li>Sole: {product.specifications?.sole}</li>
            <li>Width: {product.specifications?.width}</li>
            <li>Material: {product.specifications?.outerMaterial}</li>
          </ul>
        </div>

        {/* Add to Cart */}
        <div className="mt-6 flex gap-4 flex-wrap">
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded"
            onClick={() => addToCart(product, selectedSize, quantity)}
          >
            Add to Cart
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToWishlist(product);
            }}
            className="border px-5 py-2 rounded"
          >
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
