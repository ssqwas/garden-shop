import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  discount,
}: ProductCardProps) {
  return (
    <Link to={`/products/${id}`} className="group">
      <div className="flex flex-col gap-5 rounded-big border border-grey-divider hover:shadow-lg transition-shadow relative overflow-hidden">
        {/* Image */}
        <div className="relative h-[284px] border-b border-grey-divider overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount && (
            <div className="absolute top-4 right-4 flex items-center justify-center px-2 py-1 rounded-small bg-green">
              <span className="text-white font-semibold text-xl leading-[130%] tracking-[0.6px]">
                -{discount}%
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 px-8 pb-8">
          <h3 className="text-txt-black font-medium text-xl leading-[130%] line-clamp-1">
            {name}
          </h3>
          <div className="flex items-baseline gap-4">
            <span className="text-txt-black font-semibold text-[40px] leading-[110%]">
              ${price}
            </span>
            {originalPrice && (
              <span className="text-txt-grey font-medium text-xl leading-[130%] line-through">
                ${originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
