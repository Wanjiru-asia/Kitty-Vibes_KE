import ProductGrid from '../components/ProductGrid';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-white">
            <section className="relative pt-24 pb-8 px-8 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 size-[500px] bg-pink-300/30 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-0 left-0 size-[400px] bg-pink-200/40 rounded-full blur-[100px]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[300px] bg-pink-100/50 rounded-full blur-[80px]"></div>
                </div>
                <div className="relative z-10 text-center">
                    <h1 className="text-6xl font-black text-gray-800 mb-4">
                        Welcome to <span className="text-pink-600 italic font-serif">Kitty Vibes_KE</span>
                    </h1>
                    <p className="text-gray-500 text-lg max-w-xl mx-auto">
                        Browse our collection and find your purrfect style
                    </p>
                </div>
            </section>

            <ProductGrid />
        </div>
    );
};

export default Dashboard;