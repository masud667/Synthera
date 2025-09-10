"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/products/ProductCard.jsx";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("default");

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch categories once
//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const res = await fetch("/api/categories");
//         const data = await res.json();
//         setCategories(["All", ...data]);
//       } catch (err) {
//         console.error("Failed to load categories:", err);
//       }
//     }
//     fetchCategories();
//   }, []);

  // Fetch products when filters/pagination change
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const query = new URLSearchParams({
          search,
          category: category !== "All" ? category : "",
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          sort: sortBy,
          page,
          limit: itemsPerPage,
        });

        const res = await fetch(`/api/products`);
        // ?${query.toString()}
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [search, category, priceRange, sortBy, page]);

  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-300 w-[100%] min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r bg-[#1c4c8b] to-indigo-600 text-white rounded-lg shadow-lg p-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold">Explore Our Products</h1>
        <p className="mt-2 text-lg md:text-xl opacity-90">
          Discover the best deals on top-quality items.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Filters</h3>

          {/* Search */}
          <div className="mb-6">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // reset to first page
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => {
                setPriceRange([0, parseInt(e.target.value)]);
                setPage(1);
              }}
              className="w-full accent-blue-600"
            />
          </div>

          {/* Sort By */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              id="sort"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white p-4 rounded-lg shadow-md">
                  <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500 bg-red-100 p-4 rounded-md">{error}</div>
          ) : products?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center mt-10 space-x-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-300 hover:bg-blue-700 transition"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Prev
                </button>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md">
                  Page {page} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-300 hover:bg-blue-700 transition"
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 text-lg py-10">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}