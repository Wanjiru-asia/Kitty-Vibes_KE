import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from '../context/CartContext.tsx';
import { useWishlist } from '../hooks/useWishlist';
import logo from '../assets/KittyVibe_KE_logo.jfif';

const FULL_TEXT = "cute. bold. you.";

const Navbar = () => {
    const { state, dispatch } = useCart();
    const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
    const itemsCount = state.items.reduce((total, item) => total + item.quantity, 0);
    const wishlistCount = wishlistState.items.length;

    const [displayText, setDisplayText] = useState("");
    const indexRef = useRef(0);
    const phaseRef = useRef<"typing" | "pausing_full" | "erasing" | "pausing_empty">("typing");
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const runAnimation = () => {
            const currentPhase = phaseRef.current;
            if (currentPhase === "typing") {
                if (indexRef.current < FULL_TEXT.length) {
                    setDisplayText(FULL_TEXT.slice(0, indexRef.current + 1));
                    indexRef.current += 1;
                    timerRef.current = setTimeout(runAnimation, 120);
                } else {
                    phaseRef.current = "pausing_full";
                    timerRef.current = setTimeout(runAnimation, 1500);
                }
            } else if (currentPhase === "pausing_full") {
                phaseRef.current = "erasing";
                timerRef.current = setTimeout(runAnimation, 0);
            } else if (currentPhase === "erasing") {
                if (indexRef.current > 0) {
                    indexRef.current -= 1;
                    setDisplayText(FULL_TEXT.slice(0, indexRef.current));
                    timerRef.current = setTimeout(runAnimation, 80);
                } else {
                    phaseRef.current = "pausing_empty";
                    timerRef.current = setTimeout(runAnimation, 1000);
                }
            } else if (currentPhase === "pausing_empty") {
                phaseRef.current = "typing";
                timerRef.current = setTimeout(runAnimation, 300);
            }
        };
        timerRef.current = setTimeout(runAnimation, 500);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, []);

    return (
        <nav className="bg-white/95 backdrop-blur-xl border-b border-pink-200 px-8 py-4 sticky top-0 z-50 flex items-center justify-between shadow-sm">
            <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                    <div className="absolute inset-0 bg-pink-300/20 blur-xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity"></div>
                    <img src={logo} alt='KittyVibes logo' className="relative size-12 object-contain rounded-full" />
                </div>
                <span className="text-pink-500 font-black text-xl tracking-wide uppercase group-hover:text-pink-600 transition-colors">
                    kittyvibeske
                </span>
            </Link>

            <p className="text-pink-500 text-sm tracking-[4px] uppercase font-bold select-none min-w-45 text-center">
                {displayText}
                <span className="inline-block ml-0.5" style={{ animation: 'blinkCursor 0.8s step-end infinite' }}>|</span>
            </p>

            <style>{`@keyframes blinkCursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>

            <div className="flex items-center gap-4">
                <button className="text-gray-500 hover:text-pink-500 relative transition-colors" onClick={() => wishlistDispatch({ type: 'TOGGLE_WISHLIST' })}>
                    <Heart size={24} />
                    {wishlistCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full size-5 flex items-center justify-center font-bold">{wishlistCount}</span>
                    )}
                </button>
                <button className="text-gray-500 hover:text-pink-500 relative transition-colors" onClick={() => dispatch({ type: 'TOGGLE_CART' })}>
                    <ShoppingCart size={24} />
                    {itemsCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full size-5 flex items-center justify-center font-bold">{itemsCount}</span>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;