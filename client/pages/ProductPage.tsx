
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "react-router-dom";
import { api, Product } from "@/api";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [count, setCount] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        if (id) {
            api.getProduct(id).then(setProduct).catch(console.error);
        }
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <main className="w-full px-10 py-20 text-center">
                    <h1 className="text-4xl font-bold mb-8">Product not found</h1>
                    <Link to="/products">
                        <Button className="bg-green hover:bg-green/90 text-white">
                            Back to Store
                        </Button>
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    const discountPercent = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="w-full px-10 py-20">
                {/* Breadcrumb would go here but not in design */}

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Product Image */}
                    <div className="flex-1">
                        <div className="w-full aspect-square rounded-big overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-txt-black font-bold text-4xl md:text-5xl lg:text-[64px] leading-[110%]">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-8">
                                <span className="text-txt-black font-bold text-[40px] md:text-[64px] leading-[110%]">
                                    ${product.price}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-txt-grey line-through font-medium text-[20px] md:text-[40px] leading-[130%]">
                                        ${product.originalPrice}
                                    </span>
                                )}
                                {discountPercent > 0 && (
                                    <div className="bg-green text-white font-semibold text-xl px-2 py-1 rounded-small">
                                        -{discountPercent}%
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-4 rounded-small border border-grey-divider h-[58px] px-4">
                                <button
                                    onClick={() => setCount(Math.max(1, count - 1))}
                                    className="w-8 h-8 flex items-center justify-center text-txt-black text-2xl"
                                >
                                    −
                                </button>
                                <div className="w-12 text-center text-txt-black font-medium text-xl">
                                    {count}
                                </div>
                                <button
                                    onClick={() => setCount(count + 1)}
                                    className="w-8 h-8 flex items-center justify-center text-txt-black text-2xl"
                                >
                                    +
                                </button>
                            </div>
                            <Button
                                onClick={() => product && addToCart(product.id, count)}
                                className="bg-green hover:bg-green/90 text-white font-semibold text-xl px-14 h-[58px] rounded-small w-full md:w-auto"
                            >
                                Add to cart
                            </Button>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="text-txt-black font-semibold text-xl leading-[130%]">
                                Description
                            </h3>
                            <p className="text-txt-black text-base md:text-xl leading-[130%]">
                                {product.description || "No description available."}
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
