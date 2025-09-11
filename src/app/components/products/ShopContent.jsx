import ProductGrid from "./ProductGrid";

export default async function ShopContent() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, { cache: "no-store" });
  const data = await res.json();

  // ✅ Extract products from response
  const products = data.products || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 px-4">All Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
