import { X } from "lucide-react";

interface OrderSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function OrderSuccessModal({ isOpen, onClose }: OrderSuccessModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
            <div className="w-full max-w-[548px] bg-green rounded-big p-8 relative flex flex-col gap-4 mx-4">
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 text-white hover:opacity-80 transition-opacity"
                >
                    <X size={24} />
                </button>

                <h2 className="text-white font-bold text-[40px] leading-[110%]">
                    Congratulations!
                </h2>
                <p className="text-white font-medium text-xl leading-[130%]">
                    Your order has been successfully placed on the website.
                    <br />
                    <br />
                    A manager will contact you shortly to confirm your order.
                </p>
            </div>
        </div>
    );
}
