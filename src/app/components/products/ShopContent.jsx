import ProductGrid from "./ProductGrid";



export default async function ShopContent() {
  const res = await fetch("http://localhost:3000/product.json", { cache: "no-store" });
  const products = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 px-4">All Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
