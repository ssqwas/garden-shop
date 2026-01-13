import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="w-full h-32 border-b border-grey-divider bg-white sticky top-0 z-50">
      <div className="w-full px-10 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <div className="w-[70px] h-[70px] relative">
            <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain" />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center justify-center gap-8">
          <Link
            to="/"
            className="text-txt-black text-xl font-medium leading-[130%] hover:text-green transition-colors"
          >
            Main Page
          </Link>
          <Link
            to="/categories"
            className="text-txt-black text-xl font-medium leading-[130%] hover:text-green transition-colors"
          >
            Categories
          </Link>
          <Link
            to="/products"
            className="text-txt-black text-xl font-medium leading-[130%] hover:text-green transition-colors"
          >
            All products
          </Link>
          <Link
            to="/sales"
            className="text-txt-black text-xl font-medium leading-[130%] hover:text-green transition-colors"
          >
            All sales
          </Link>
        </nav>

        {/* Cart Icon */}
        <Link to="/cart" className="flex-shrink-0">
          <div className="w-[52px] h-[52px] relative hover:opacity-80 transition-opacity">
            <img src="/cart-icon.png" alt="Cart" className="w-full h-full object-contain" />
            {totalItems > 0 && (
              <div className="absolute top-[-8px] left-[-8px] w-8 h-8 bg-green rounded-full flex items-center justify-center border-4 border-white">
                <span className="text-white text-base font-semibold leading-none">
                  {totalItems}
                </span>
              </div>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
