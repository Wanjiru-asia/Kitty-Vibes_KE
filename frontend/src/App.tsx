import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import NewArrivalsSection from "./components/NewArrivalsSection.tsx";
import CartSidebar from "./components/CartSidebar.tsx";
import WishlistSidebar from "./components/WishlistSidebar.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { WishlistProvider } from "./context/WishlistContext.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";
import Dashboard from "./pages/Dashboard.tsx";

function App() {
    return (
        <CartProvider>
            <WishlistProvider>
                <ToastProvider>
                    <Router>
                        <div className="min-h-screen bg-black text-white">
                            <Navbar />
                            <Routes>
                                <Route path="/" element={
                                    <>
                                        <Hero />

                                        <NewArrivalsSection />

                                        {/* "Our Collection" + EXPLORE button */}
                                        <section className="bg-black py-24 px-8 text-center">
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
                                            <p className="text-zinc-400 font-light text-lg max-w-xl mx-auto mb-8">
                                                Handpicked with love for hello kitty lovers
                                            </p>
                                            <a
                                                href="/dashboard"
                                                className="group bg-pink-600 hover:bg-pink-500 text-white px-10 py-4 rounded-full font-black tracking-widest text-sm hover:shadow-xl hover:shadow-pink-500/30 hover:-translate-y-1 transition-all inline-flex items-center gap-3"
                                            >
                                                EXPLORE OUR PRODUCTS
                                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                                            </a>
                                        </section>
                                    </>
                                } />
                                <Route path="/dashboard" element={<Dashboard />} />
                            </Routes>
                            <CartSidebar />
                            <WishlistSidebar />
                        </div>
                    </Router>
                </ToastProvider>
            </WishlistProvider>
        </CartProvider>
    );
}

export default App;