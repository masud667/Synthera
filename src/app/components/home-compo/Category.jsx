const categories = [
  { name: "Men", img: "https://i.ibb.co.com/JbYgTQ6/Screenshot-2025-09-06-041313.png" },
  { name: "Women", img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg" },
  { name: "Kids", img: "https://i.ibb.co.com/hJJ8dzbh/Screenshot-2025-09-06-042203.png" },
  { name: "Accessories", img: "https://i.ibb.co.com/N2xzzSDN/Screenshot-2025-09-06-042530.png" },
  { name: "Shoes", img: "https://i.ibb.co.com/GfcjPpRL/Screenshot-2025-09-06-043013.png" },
  { name: "Perfumes", img: "https://i.ibb.co.com/G4MPFLBb/Screenshot-2025-09-06-043727.png" },
];

export default function Categories() {
  return (
    <div className="w-full px-6 py-10">
      {/* Section heading */}
      <h2 className="text-2xl font-bold mb-6 ">Category</h2>

      {/* Categories grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="relative w-full h-60 rounded-xl overflow-hidden cursor-pointer group"
          >
            {/* Background image */}
            <img
              src={cat.img}
              alt={cat.name}
              className="w-full h-full object-cover object-top transform group-hover:scale-105 transition duration-300"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <h3 className="text-white text-lg font-semibold">{cat.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

