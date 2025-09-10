import ProductCard from "./ProductCard";


export default function ProductGrid({ products }) {
  return (
    <div className="w-11/12 mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 ">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
