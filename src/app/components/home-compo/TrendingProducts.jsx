"use client"; // if you are using Next.js 13+ with app directory

import dynamic from "next/dynamic";
import Card from "../../components/Card"; // your card component

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const trendingProducts = [
  { id: 1, name: "Men’s Jacket", price: "$60", img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
  { id: 2, name: "Women’s Dress", price: "$80", img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
  { id: 3, name: "Sneakers", price: "$50", img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
  { id: 4, name: "Kids T-Shirt", price: "$20", img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
  { id: 5, name: "Perfume", price: "$40", img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
];

export default function TrendingProducts() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full px-6 py-10">
      {/* Section heading */}
      <h2 className="text-2xl font-bold mb-6">Trending Products</h2>

      {/* Slider */}
      <Slider {...settings}>
        {trendingProducts.map((product) => (
          <div key={product.id} className="px-2">
            <Card product={product} />
          </div>
        ))}
      </Slider>

      {/* View All button */}
      <div className="flex justify-center mt-6">
        <button className="btn btn-outline btn-primary">
          View All Products
        </button>
      </div>
    </div>
  );
}
