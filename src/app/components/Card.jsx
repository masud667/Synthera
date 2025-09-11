import { FaStar } from "react-icons/fa";

const Card = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-md transition">
      <figure className="h-48">
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="card-body p-4">
        {/* Product Title */}
        <h2 className="card-title text-base">{product.name}</h2>

        {/* Price + Rating */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-semibold">${product.price}</p>
          <div className="flex items-center gap-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                size={14}
                className={i < product.rating ? "fill-current" : "text-gray-300"}
              />
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="card-actions mt-3">
          <button className="btn btn-sm btn-primary w-full">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
