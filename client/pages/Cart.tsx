import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { api, Product } from "@/api";
import { useEffect, useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Input } from "@/components/ui/input";
import { OrderSuccessModal } from "@/components/OrderSuccessModal";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    email: false
  });

  useEffect(() => {
    api.getProducts().then(setProducts).catch(console.error);
  }, []);

  const cartProducts = cartItems
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const totalItems = cartProducts.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {
      name: formData.name.trim() === "",
      phone: !/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, "")),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.phone || newErrors.email) {
      return;
    }

    try {
      await api.sendOrder({
        ...formData,
        items: cartItems
      });
      setIsModalOpen(true);
      clearCart();
      setFormData({ name: "", phone: "", email: "" });
    } catch (error) {
      console.error("Order failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="w-full px-10 py-20">
        <div className="flex items-center gap-8 mb-10">
          <h1 className="text-txt-black font-bold text-4xl md:text-5xl lg:text-[64px] leading-[110%]">
            Shopping cart
          </h1>
          <div className="flex items-center flex-1 gap-8 pt-2.5">
            <div className="flex-1 h-px bg-grey-divider" />
            <Link
              to="/products"
              className="px-4 py-2 rounded-small border border-grey-divider text-txt-grey text-center font-medium text-base leading-[126%] hover:border-txt-black hover:text-txt-black transition-colors"
            >
              Back to the store
            </Link>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col gap-8">
            <p className="text-txt-black font-medium text-xl leading-[130%]">
              Looks like you have no items in your basket currently.
            </p>
            <Link to="/products">
              <Button className="bg-green hover:bg-green/90 text-white font-semibold text-xl px-14 py-4 h-auto rounded-small">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="flex-1 flex flex-col gap-4">
              {cartProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center gap-8 border border-grey-divider rounded-big p-8 relative"
                >
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-4 right-4 text-txt-grey hover:text-txt-black transition-colors"
                  >
                    <X size={24} />
                  </button>

                  <div className="w-full md:w-[200px] h-[180px] rounded-big overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col gap-8 w-full">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-txt-black font-medium text-xl leading-[130%] pr-8">
                        {item.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 rounded-small border border-grey-divider h-[58px] px-4">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-txt-black"
                        >
                          <Minus size={20} />
                        </button>
                        <div className="w-8 text-center text-txt-black font-medium text-xl">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-txt-black"
                        >
                          <Plus size={20} />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-txt-black font-bold text-[40px] leading-[110%]">
                          ${item.price * item.quantity}
                        </span>
                        {item.originalPrice && (
                          <span className="text-txt-grey line-through font-medium text-xl leading-[130%]">
                            ${item.originalPrice * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Details Form */}
            <div className="w-full lg:w-[548px] p-8 rounded-big bg-light-grey flex flex-col gap-8 h-fit">
              <div className="flex flex-col gap-6">
                <h2 className="text-txt-black font-bold text-[40px] leading-[110%]">
                  Order details
                </h2>
                <div className="flex flex-col">
                  <p className="text-txt-grey font-medium text-[40px] leading-[130%]">
                    {totalItems} items
                  </p>
                  <div className="flex items-baseline justify-between mt-4">
                    <span className="text-txt-grey font-medium text-[40px] leading-[130%]">
                      Total
                    </span>
                    <span className="text-txt-black font-bold text-[64px] leading-[110%]">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleOrder} className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <Input
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`bg-white border-none h-[58px] px-8 rounded-small text-xl font-medium placeholder:text-txt-grey ${errors.name ? 'ring-2 ring-red-500' : ''}`}
                  />
                  <Input
                    required
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`bg-white border-none h-[58px] px-8 rounded-small text-xl font-medium placeholder:text-txt-grey ${errors.phone ? 'ring-2 ring-red-500' : ''}`}
                  />
                  <Input
                    required
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`bg-white border-none h-[58px] px-8 rounded-small text-xl font-medium placeholder:text-txt-grey ${errors.email ? 'ring-2 ring-red-500' : ''}`}
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-green hover:bg-green/90 text-white font-semibold text-xl h-[58px] rounded-small w-full"
                >
                  Order
                </Button>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <OrderSuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
