import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface CartItem {
    productId: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (productId: string, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, delta: number) => void;
    clearCart: () => void;
    totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        try {
            const stored = localStorage.getItem("cart");
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (productId: string, quantity = 1) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.productId === productId);
            if (existing) {
                return prev.map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { productId, quantity }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    };

    const updateQuantity = (productId: string, delta: number) => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.productId === productId) {
                    const newQuantity = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
