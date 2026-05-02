import { useState } from 'react';
import useProducts from "../hooks/useProducts.ts";
import ProductCard from "./ProductCard.tsx";

const categories = ["All", "Bags", "Pajamas", "Blankets", "Accessories", "Slides"];
const NEW_ARRIVAL_IDS = [15, 16, 17];

const ProductGrid = () => {
    const { products, loading, error } = useProducts();
    const [activeCategory, setActiveCategory] = useState("All");

    const newArrivals = products.filter(p => NEW_ARRIVAL_IDS.includes(p.id));

    const filtered = activeCategory === "All"
        ? products
        : products.filter(p => p.category === activeCategory.toLowerCase());

    if (loading) return (
        <div className="flex items-center justify-center py-32">
            <div className="size-16 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin" />
        </div>
    );

    if (error) return (
        <div className="text-center py-32 text-pink-500">{error}</div>
    );

    return (
        <section className="relative bg-black py-24 px-8 overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-20 right-20 size-72 bg-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-20 size-96 bg-pink-600/5 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="relative z-10">
                {/* New Arrivals */}
                {newArrivals.length > 0 && (
                    <div className="mb-24">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-3 mb-4 bg-pink-500/10 border border-pink-500/20 rounded-full px-6 py-2">
                                <span className="text-pink-400 text-xs tracking-[6px] uppercase font-bold">New Arrivals</span>
                            </div>
                            <style>
                                {`
                                    @keyframes glowPulse {
                                        0%, 100% { text-shadow: 0 0 20px rgba(236, 72, 153, 0.4); }
                                        50% { text-shadow: 0 0 40px rgba(236, 72, 153, 0.7), 0 0 60px rgba(236, 72, 153, 0.3); }
                                    }
                                `}
                            </style>
                            <h2 className="text-6xl font-black text-white mb-4" style={{ animation: 'glowPulse 2s ease-in-out infinite' }}>
                                Fresh <span className="text-pink-500 italic font-serif">Drops</span> Just Landed
                            </h2>
                            <p className="text-zinc-400 font-light text-lg max-w-xl mx-auto">
                                Be the first to rock these purrfect new pieces
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {newArrivals.map((product) => (
                                <div key={product.id} className="relative">
                                    <span className="absolute top-4 left-4 z-20 bg-pink-600 text-white text-xs px-3 py-1.5 rounded-full font-black tracking-wider uppercase animate-pulse">NEW</span>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Divider */}
                {newArrivals.length > 0 && (
                    <div className="flex items-center justify-center gap-4 mb-24">
                        <div className="h-px flex-1 bg-linear-to-r from-transparent via-pink-500/20 to-transparent"></div>
                        <div className="size-2 bg-pink-500 rounded-full"></div>
                        <div className="h-px flex-1 bg-linear-to-r from-transparent via-pink-500/20 to-transparent"></div>
                    </div>
                )}

                {/* Our Collection heading */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4 bg-pink-500/10 border border-pink-500/20 rounded-full px-6 py-2">
                        <span className="text-pink-400 text-xs tracking-[6px] uppercase font-bold">Our Collection</span>
                    </div>
                    <h2 className="text-7xl font-black text-white mb-4">
                        Find Your{" "}
                        <span className="relative inline-block">
                            <span className="text-pink-500 italic font-serif relative z-10">Purrfect</span>
                            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 15 Q 25 5, 50 15 T 100 15" stroke="rgb(236, 72, 153)" strokeWidth="3" fill="none" opacity="0.5"/>
                            </svg>
                        </span>
                        {" "}Match
                    </h2>
                    <p className="text-zinc-400 font-light text-lg max-w-xl mx-auto">
                        Handpicked with love for hello kitty lovers
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                                activeCategory === cat
                                    ? "bg-pink-600 text-white shadow-lg shadow-pink-500/30 scale-110"
                                    : "text-zinc-400 hover:text-pink-300 bg-zinc-900/80 border border-zinc-800 hover:border-pink-500/30 hover:scale-105"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {filtered.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;