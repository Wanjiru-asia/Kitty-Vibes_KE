import { X, Heart, ShoppingCart } from "lucide-react";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../context/CartContext.tsx";
import { useToast } from "../context/ToastContext.tsx";
import type { Products } from "../types";

const WishlistSidebar = () => {
    const {state, dispatch} = useWishlist();
    const {dispatch: cartDispatch} = useCart();
    const {addToast} = useToast();

    if (!state.isOpen) return null;

    const handleAddToCart = (item: Products) => {
        cartDispatch({
            type: 'ADD_ITEM',
            payload: {
                id: item.id,
                product_name: item.product_name,
                description: item.description,
                price: item.price,
                category: item.category,
                img_url: item.img_url,
                created_at: item.created_at,
            },
        });
        addToast('Added to cart from wishlist 🛍️');
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
                onClick={() => dispatch({ type: 'CLOSE_WISHLIST' })}
            />
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l-2 border-pink-200 shadow-2xl z-50">
                <div className="h-full flex flex-col">
                    <div className="p-6 border-b-2 border-pink-100 flex items-center justify-between">
                        <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                            <Heart size={24} className="text-pink-500 fill-pink-500" />
                            Wishlist
                            {state.items.length > 0 && (
                                <span className="bg-pink-600 text-white text-sm rounded-full size-6 flex items-center justify-center font-bold">
                                    {state.items.length}
                                </span>
                            )}
                        </h2>
                        <button
                            onClick={() => dispatch({ type: 'CLOSE_WISHLIST' })}
                            className="p-2 hover:bg-pink-50 rounded-full transition-colors"
                        >
                            <X size={20} className="text-gray-400 hover:text-pink-500" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6">
                        {state.items.length === 0 ? (
                            <div className="text-center py-12">
                                <Heart size={64} className="text-pink-200 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg font-medium">Your wishlist is empty</p>
                                <p className="text-gray-400 text-sm mt-2">Save items you love!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {state.items.map((item) => (
                                    <div key={item.id} className="flex gap-4 bg-pink-50/80 border-2 border-pink-100 rounded-xl p-4">
                                        <img src={item.img_url} alt={item.product_name} className="size-20 object-cover rounded-lg" />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-800 text-sm">{item.product_name}</h4>
                                            <p className="text-pink-600 font-bold mt-1">KES {item.price.toLocaleString()}</p>
                                            <button
                                                onClick={() => handleAddToCart(item)}
                                                className="mt-3 bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all"
                                            >
                                                <ShoppingCart size={14} />
                                                Add to Cart
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: item.id })}
                                            className="text-gray-400 hover:text-pink-500 transition-colors self-start"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default WishlistSidebar;