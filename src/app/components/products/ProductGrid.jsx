"use client";
import ProductCard from "./ProductCard";
import dynamic from "next/dynamic";


const Slider = dynamic(() => import("react-slick"), { ssr: false });


export default function ProductGrid({ products }) {
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
    <div className="w-11/12 mx-auto px-4 gap-6 ">
      
      {/* Slider */}
      <Slider {...settings}>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </Slider>
    </div>
  );
}
