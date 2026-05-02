import type { Products } from "../types";
import { useCart } from "../context/CartContext.tsx";
import { useWishlist } from "../hooks/useWishlist";
import { useToast } from "../context/ToastContext.tsx";
import { ShoppingCart, Heart } from "lucide-react";

const ProductCard = ({ product }: { product: Products }) => {
    const { dispatch } = useCart();
    const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
    const { addToast } = useToast();

    const isLiked = wishlistState.items.some(item => item.id === product.id);

    const toggleWishlist = () => {
        if (isLiked) {
            wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
            addToast('Removed from wishlist 💔');
        } else {
            wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: product });
            addToast('Added to wishlist 💖');
        }
    };

    const handleAddToCart = () => {
        dispatch({ type: "ADD_ITEM", payload: product });
        addToast('Added to cart 🛍️');
    };

    return (
        <div className="group relative bg-white border-2 border-pink-200 hover:border-pink-400 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-200/50">
            <div className="relative bg-gradient-to-br from-pink-50 to-white h-72 flex items-center justify-center p-8 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-48 bg-pink-200/40 rounded-full blur-3xl group-hover:bg-pink-300/50 transition-all duration-500"></div>
                </div>
                <img
                    src={product.img_url || product.image_url || ''}
                    alt={product.product_name}
                    className="relative h-full w-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                />
                <button onClick={toggleWishlist} className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-sm border-2 border-pink-200 rounded-full hover:border-pink-400 transition-all z-10">
                    <Heart size={16} className={`transition-all ${isLiked ? 'fill-pink-500 text-pink-500' : 'text-gray-400 hover:text-pink-500'}`} />
                </button>
                <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm border-2 border-pink-200 text-pink-500 text-xs px-3 py-1.5 rounded-full font-medium">{product.category}</span>
            </div>
            <div className="p-5 border-t-2 border-pink-100">
                <h2 className="text-gray-800 font-bold text-lg leading-tight mb-2 group-hover:text-pink-600 transition-colors">{product.product_name}</h2>
                <p className="text-gray-500 text-sm font-light leading-relaxed mb-4">
                    {product.description}
                </p>
                <div className="h-px bg-gradient-to-r from-pink-300 to-transparent mb-4"></div>
                <div className="flex items-center justify-between">
                    <p className="text-black font-bold text-xl">KES {product.price.toLocaleString()}</p>
                    <button onClick={handleAddToCart} className="bg-pink-600 hover:bg-pink-500 text-white p-3 rounded-full transition-all hover:scale-110 hover:shadow-lg hover:shadow-pink-300/50 border-2 border-pink-500">
                        <ShoppingCart size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ProductCard;