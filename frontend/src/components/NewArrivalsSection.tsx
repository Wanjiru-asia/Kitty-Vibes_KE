import useProducts from '../hooks/useProducts';
import ProductCard from './ProductCard';

const NEW_ARRIVAL_IDS = [15, 16, 17];

const NewArrivalsSection = () => {
    const { products, loading, error } = useProducts();
    const newArrivals = products.filter(p => NEW_ARRIVAL_IDS.includes(p.id));

    if (loading) return (
        <div className="flex justify-center py-32">
            <div className="size-16 border-2 border-pink-300 border-t-pink-500 rounded-full animate-spin" />
        </div>
    );

    if (error) return (
        <div className="text-center py-32 text-pink-600">{error}</div>
    );

    if (newArrivals.length === 0) return null;

    return (
        <section className="relative bg-white py-24 px-8 overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-20 right-20 size-72 bg-pink-100/60 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-20 size-96 bg-pink-200/40 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="relative z-10">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-3 mb-4 bg-pink-50 border border-pink-200 rounded-full px-6 py-2">
                        <span className="text-pink-600 text-xs tracking-[6px] uppercase font-bold">New Arrivals</span>
                    </div>
                    <style>
                        {`
                            @keyframes glowPulse {
                                0%, 100% { text-shadow: 0 0 10px rgba(236, 72, 153, 0.3); }
                                50% { text-shadow: 0 0 25px rgba(236, 72, 153, 0.6); }
                            }
                        `}
                    </style>
                    <h2 className="text-6xl font-black text-gray-800 mb-4" style={{ animation: 'glowPulse 2s ease-in-out infinite' }}>
                        Fresh <span className="text-pink-600 italic font-serif">Drops</span> Just Landed
                    </h2>
                    <p className="text-gray-500 font-light text-lg max-w-xl mx-auto">
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
        </section>
    );
};

export default NewArrivalsSection;