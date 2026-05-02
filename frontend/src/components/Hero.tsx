import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-screen overflow-hidden bg-black">
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 size-150 bg-pink-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 size-125 bg-pink-600/8 rounded-full blur-[100px]"></div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <style>
                    {`
                        @keyframes kittyGlow {
                            0%, 100% { opacity: 0.2; text-shadow: 0 0 40px rgba(236, 72, 153, 0.4); }
                            50% { opacity: 0.35; text-shadow: 0 0 80px rgba(236, 72, 153, 0.6), 0 0 120px rgba(236, 72, 153, 0.3); }
                        }
                    `}
                </style>
                <span
                    className="text-[18vw] font-black text-pink-500 tracking-tight select-none"
                    style={{ animation: 'kittyGlow 5s ease-in-out infinite' }}
                >
                    KITTYVIBES
                </span>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
                <div className="backdrop-blur-md bg-black/20 border border-pink-500/30 rounded-3xl p-16 max-w-3xl text-center shadow-2xl shadow-pink-500/5">
                    <h1 className="text-8xl font-black text-white leading-[0.9] tracking-tight mb-8 drop-shadow-lg">
                        To All My<br/>
                        <span className="relative">
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-pink-500 to-pink-400 italic font-serif">
                                Hello Kitty
                            </span>
                            <br/>
                            <span className="text-pink-500 italic font-serif">
                                Lovers
                            </span>
                            <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 15" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 10 Q 50 0, 100 10 T 200 10" stroke="rgb(236, 72, 153)" strokeWidth="2" fill="none" opacity="0.4"/>
                            </svg>
                        </span>
                    </h1>

                    <div className="flex items-center justify-center gap-3 mb-10">
                        <div className="h-px w-8 bg-pink-500/40"></div>
                        <p className="text-pink-300/90 font-bold text-xl tracking-wide">
                            Cozy up in Style ✨
                        </p>
                        <div className="h-px w-8 bg-pink-500/40"></div>
                    </div>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="group relative bg-pink-600 hover:bg-pink-500 text-white px-12 py-5 rounded-full text-sm font-black tracking-widest hover:shadow-2xl hover:shadow-pink-500/40 hover:-translate-y-1 transition-all inline-flex items-center gap-3 overflow-hidden"
                    >
                        <span className="relative z-10">SHOP NOW</span>
                        <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
                        <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                    </button>
                </div>
            </div>
        </section>
    )
}
export default Hero;