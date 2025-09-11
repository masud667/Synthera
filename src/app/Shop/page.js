"use client";

import { useState } from "react";
import Card from "../components/Card"; // adjust path if needed

// Dummy products (temporary)
// TODO: Remove this later when fetching from backend
const products = [
  { id: 1, name: "Men’s Jacket", category: "Men", price: 60, img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
  { id: 2, name: "Women’s Dress", category: "Women", price: 80, img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
  { id: 3, name: "Sneakers", category: "Shoes", price: 50, img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
  { id: 4, name: "Kids T-Shirt", category: "Kids", price: 20, img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
  { id: 5, name: "Perfume", category: "Accessories", price: 40, img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
];

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100]);

  // ========================
  // TODO: Replace this with backend fetch
  // Example:
  /*
  useEffect(() => {
    async function fetchProducts() {
      const query = new URLSearchParams({
        search,
        category,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      });
      const res = await fetch(`/api/products?${query.toString()}`);
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, [search, category, priceRange]);
  */
  // ========================

  // Local filtering (temporary for dummy data)
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="w-full px-6 py-10">
      {/* Heading */}
      {/* <h2 className="text-3xl font-bold mb-6">Shop</h2> */}

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Search */}
       {/* Search with button */}
        <div className="join col-span-2">
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered join-item w-full"
            />
            <button
                className="btn btn-primary join-item"
                onClick={() => {
                // TODO: integrate backend search here
                console.log("Searching for:", search);
                }}
            >
                Search
            </button>
        </div>


        {/* Category */}
        <select
          className="select select-bordered w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          <option value="Shoes">Shoes</option>
          <option value="Accessories">Accessories</option>
        </select>

        {/* Price filter */}
        <select
          className="select select-bordered w-full"
          onChange={(e) => {
            const val = e.target.value;
            if (val === "low") setPriceRange([0, 50]);
            else if (val === "mid") setPriceRange([51, 100]);
            else setPriceRange([0, 100]);
          }}
        >
          <option value="all">All Prices</option>
          <option value="low">Under $50</option>
          <option value="mid">$51 - $100</option>
        </select>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
}
