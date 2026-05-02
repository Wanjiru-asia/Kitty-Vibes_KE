import React, { useState } from "react";
import { useCart } from "../context/CartContext.tsx";
import { useToast } from "../context/ToastContext.tsx";
import { X, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";

const CartSidebar = () => {
    const { state, dispatch } = useCart();
    const { addToast } = useToast();
    const [checkout, setCheckout] = useState(false);
    const [form, setForm] = useState({ name: '', phone: '', location: '' });

    if (!state.isOpen) return null;

    const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckoutSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const itemsList = state.items
            .map(item => `- ${item.quantity}x ${item.product_name} (KES ${item.price.toLocaleString()})`)
            .join('\n');
        const message = `🐱 Hello Kitty Vibes! New Order:\n\n${itemsList}\n\nTotal: KES ${total.toLocaleString()}\n\nName: ${form.name}\nPhone: ${form.phone}\nLocation: ${form.location}`;
        window.open(`https://wa.me/254717300986?text=${encodeURIComponent(message)}`, '_blank');
        addToast('Order sent via WhatsApp 📱');
        setCheckout(false);
    };

    if (checkout) {
        return (
            <>
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={() => setCheckout(false)} />
                <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l-2 border-pink-200 shadow-2xl z-50">
                    <div className="p-6 border-b-2 border-pink-100 flex items-center gap-4">
                        <button onClick={() => setCheckout(false)} className="p-2 hover:bg-pink-50 rounded-full">
                            <ArrowLeft size={20} className="text-pink-600" />
                        </button>
                        <h2 className="text-2xl font-black text-gray-800">Delivery Details</h2>
                    </div>
                    <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-5">
                        <div>
                            <label className="text-sm text-gray-600 font-bold mb-1 block">Full Name *</label>
                            <input
                                type="text"
                                required
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-pink-200 rounded-xl px-4 py-3 text-gray-800 focus:border-pink-500 outline-none"
                                placeholder="Jane Doe"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 font-bold mb-1 block">Phone Number *</label>
                            <input
                                type="tel"
                                required
                                value={form.phone}
                                onChange={e => setForm({ ...form, phone: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-pink-200 rounded-xl px-4 py-3 text-gray-800 focus:border-pink-500 outline-none"
                                placeholder="0712345678"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 font-bold mb-1 block">Estate / Location *</label>
                            <input
                                type="text"
                                required
                                value={form.location}
                                onChange={e => setForm({ ...form, location: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-pink-200 rounded-xl px-4 py-3 text-gray-800 focus:border-pink-500 outline-none"
                                placeholder="Nairobi, Kilimani"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-pink-600 hover:bg-pink-500 text-white py-4 rounded-full font-black tracking-wider hover:shadow-lg transition-all border-2 border-pink-500"
                        >
                            SEND ORDER VIA WHATSAPP
                        </button>
                    </form>
                </div>
            </>
        );
    }

    return (
        <>
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
                onClick={() => dispatch({ type: 'CLOSE_CART' })}
            />

            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l-2 border-pink-200 shadow-2xl z-50">
                <div className="h-full flex flex-col">

                    <div className="p-6 border-b-2 border-pink-100 flex items-center justify-between">
                        <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                            <ShoppingBag size={24} className="text-pink-500" />
                            Your Cart
                            {state.items.length > 0 && (
                                <span className="bg-pink-600 text-white text-sm rounded-full size-6 flex items-center justify-center font-bold">
                                    {state.items.length}
                                </span>
                            )}
                        </h2>
                        <button
                            onClick={() => dispatch({ type: 'CLOSE_CART' })}
                            className="p-2 hover:bg-pink-50 rounded-full transition-colors border border-transparent hover:border-pink-200"
                        >
                            <X size={20} className="text-gray-400 hover:text-pink-500" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {state.items.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="relative inline-block mb-6">
                                    <ShoppingBag size={64} className="text-pink-200" />
                                    <span className="absolute -top-2 -right-2 text-3xl">😿</span>
                                </div>
                                <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
                                <p className="text-gray-400 text-sm mt-2">Add some purrfect items!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {state.items.map((item) => (
                                    <div key={item.id} className="flex gap-4 bg-pink-50/80 border-2 border-pink-100 hover:border-pink-300 rounded-xl p-4 transition-all">
                                        <div className="relative">
                                            <img
                                                src={item.img_url}
                                                alt={item.product_name}
                                                className="size-20 object-cover rounded-lg"
                                            />
                                            <div className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full size-5 flex items-center justify-center font-bold">
                                                {item.quantity}
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-800 text-sm">{item.product_name}</h4>
                                            <p className="text-pink-600 font-bold mt-1">KES {item.price.toLocaleString()}</p>

                                            <div className="flex items-center gap-2 mt-3">
                                                <button
                                                    className="p-1.5 bg-white border border-pink-200 hover:border-pink-400 rounded-lg transition-all text-gray-500 hover:text-pink-500"
                                                    onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: item.id })}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="font-bold text-gray-800 min-w-5 text-center">{item.quantity}</span>
                                                <button
                                                    className="p-1.5 bg-white border border-pink-200 hover:border-pink-400 rounded-lg transition-all text-gray-500 hover:text-pink-500"
                                                    onClick={() => dispatch({ type: 'ADD_ITEM', payload: {
                                                            id: item.id,
                                                            product_name: item.product_name,
                                                            description: item.description,
                                                            price: item.price,
                                                            category: item.category,
                                                            img_url: item.img_url,
                                                            created_at: item.created_at
                                                        }})}
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                                            className="text-gray-400 hover:text-pink-500 transition-colors self-start"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {state.items.length > 0 && (
                        <div className="border-t-2 border-pink-100 p-6 bg-pink-50/50">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-gray-600">KES {total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between mb-6">
                                <span className="text-gray-600">Shipping</span>
                                <span className="text-pink-600 font-medium">Calculated at checkout</span>
                            </div>
                            <div className="flex justify-between mb-6 pt-4 border-t border-pink-200">
                                <span className="text-gray-800 font-bold text-lg">Total</span>
                                <span className="text-2xl font-black text-pink-600">KES {total.toLocaleString()}</span>
                            </div>
                            <button
                                onClick={() => setCheckout(true)}
                                className="w-full bg-pink-600 hover:bg-pink-500 text-white py-4 rounded-full font-black tracking-wider hover:shadow-lg hover:shadow-pink-300/50 transition-all border-2 border-pink-500"
                            >
                                CHECKOUT
                            </button>
                            <button
                                onClick={() => dispatch({ type: 'CLOSE_CART' })}
                                className="w-full text-gray-500 hover:text-pink-500 py-3 text-sm font-medium transition-colors mt-3"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartSidebar;