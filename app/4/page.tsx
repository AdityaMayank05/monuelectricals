"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const brandLogos = [
  { name: "Havells", src: "/assets/logos/havells-logo.svg" },
  { name: "Crompton", src: "/assets/logos/crompton-logo.svg" },
  { name: "Bajaj", src: "/assets/logos/bajaj-electricals-logo 1.svg" },
  { name: "Anchor", src: "/assets/logos/anchor-by-panasonic.svg" },
  { name: "Polycab", src: "/assets/logos/polycab-logo.svg" },
  { name: "Usha", src: "/assets/logos/usha-logo.svg" },
  { name: "KEI", src: "/assets/logos/kei-logo.svg" },
  { name: "Polar", src: "/assets/logos/polar-logo.svg" },
];

const rotatingProducts = [
  { name: "Havells Enticer", category: "CEILING FAN", image: "/assets/fans/havells-enticer-brown.png" },
  { name: "Crompton Venti", category: "EXHAUST FAN", image: "/assets/ventilation-fans/crompton-venti.png" },
  { name: "Atomberg Renesa", category: "BLDC FAN", image: "/assets/fans/atomberg-renesa-white.png" },
  { name: "Sakash Chimney", category: "CHIMNEY", image: "/assets/chimneys/Sakashchimney.png" },
  { name: "Bajaj Artisan", category: "DESIGNER FAN", image: "/assets/fans/bajaj-artisan-grey.png" },
  { name: "Havells Venti", category: "VENTILATION", image: "/assets/ventilation-fans/haveels-venti.png" },
  { name: "Orient Blanco", category: "MODERN FAN", image: "/assets/fans/orient-blanco-white.png" },
  { name: "Glen Chimney", category: "CHIMNEY", image: "/assets/chimneys/Glen-automatic-chimney.png" },
];

const categories = [
  { name: "Ceiling Fans", count: "28+", image: "/assets/category-cover/fan-cover.png", color: "from-orange-400 to-amber-500" },
  { name: "Ventilation", count: "12+", image: "/assets/category-cover/haveels-venti.png", color: "from-teal-400 to-cyan-500" },
  { name: "Switchgear", count: "50+", image: "/assets/category-cover/switch-cover.png", color: "from-violet-400 to-purple-500" },
  { name: "Chimneys", count: "8+", image: "/assets/category-cover/sakash-automatic-chimney.png", color: "from-rose-400 to-pink-500" },
  { name: "Wires", count: "20+", image: "/assets/category-cover/havells-wire.png", color: "from-emerald-400 to-green-500" },
  { name: "Lighting", count: "35+", image: "/assets/category-cover/celing-light.png", color: "from-amber-400 to-yellow-500" },
];

const reviews = [
  { name: "Rajesh K.", rating: 5, text: "Excellent service and genuine products. Been buying here for 10 years!" },
  { name: "Priya S.", rating: 5, text: "Best prices in the city. Staff is very helpful and knowledgeable." },
  { name: "Amit P.", rating: 5, text: "Quick delivery and great after-sales support. Highly recommended!" },
];

export default function WarmGradientPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-animate").forEach((el) => {
      observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProductIndex((prev) => (prev + 1) % rotatingProducts.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-12 lg:px-20 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
            <span className="text-white font-black">P</span>
          </div>
          <span className="text-xl font-black tracking-tight">
            Power<span className="text-orange-600">Zone</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-400 hidden md:block">Est. 2005</span>
          <a href="#contact" className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 transition-all cursor-pointer">
            Contact Us
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 md:px-12 lg:px-20 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm mb-8">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-600">Electrical Superstore</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight">
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Premium</span>
                <span className="block text-gray-900">Electricals</span>
                <span className="block text-gray-300">For Your Home</span>
              </h1>

              <p className="text-gray-500 mt-8 text-lg max-w-md leading-relaxed">
                Two decades of excellence. Quality products from world-renowned brands at competitive prices.
              </p>

              {/* Stats Cards */}
              <div className="flex gap-4 mt-10">
                <div className="bg-white rounded-2xl p-5 shadow-lg shadow-orange-100">
                  <span className="text-3xl font-black text-orange-600">500+</span>
                  <p className="text-xs text-gray-400 mt-1">Products</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-lg shadow-orange-100">
                  <span className="text-3xl font-black text-gray-900">20</span>
                  <p className="text-xs text-gray-400 mt-1">Years</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-lg shadow-orange-100">
                  <span className="text-3xl font-black text-gray-900">2</span>
                  <p className="text-xs text-gray-400 mt-1">Stores</p>
                </div>
              </div>

              {/* Store Info */}
              <div className="flex gap-6 mt-10">
                <div className="flex items-start gap-3">
                  <div className="w-1 h-12 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></div>
                  <div>
                    <p className="text-xs text-gray-400">Store 01</p>
                    <p className="font-bold">Main Market</p>
                    <p className="text-sm text-gray-400">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="text-xs text-gray-400">Store 02</p>
                    <p className="font-bold">City Center</p>
                    <p className="text-sm text-gray-400">+91 98765 43211</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Product Carousel */}
            <div className="flex items-center justify-center">
              <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px]">
                {/* Background circles */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-100 to-amber-100"></div>
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-orange-50 to-white"></div>
                
                {/* Rotating ring of products */}
                <div 
                  className="absolute inset-0 transition-transform duration-1000 ease-out"
                  style={{ transform: `rotate(-${activeProductIndex * 45}deg)` }}
                >
                  {rotatingProducts.map((product, i) => {
                    const angle = i * 45;
                    return (
                      <div
                        key={i}
                        className="absolute left-1/2 top-1/2"
                        style={{ transform: `rotate(${angle}deg) translateY(-140px)` }}
                      >
                        <div 
                          className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center p-2 -ml-7 -mt-7 md:-ml-8 md:-mt-8 transition-all duration-500 ${
                            i === activeProductIndex ? 'ring-4 ring-orange-400 ring-offset-2 scale-110' : ''
                          }`}
                          style={{ transform: `rotate(${activeProductIndex * 45}deg)` }}
                        >
                          <Image src={product.image} alt={product.name} width={40} height={40} className="object-contain" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Center display */}
                <div className="absolute inset-20 md:inset-24 rounded-full bg-white shadow-2xl shadow-orange-200 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto">
                      {rotatingProducts.map((product, i) => (
                        <div
                          key={i}
                          className={`absolute inset-0 transition-all duration-500 ${
                            i === activeProductIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                          }`}
                        >
                          <Image src={product.image} alt={product.name} fill className="object-contain" />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-orange-600 font-bold mt-3">{rotatingProducts[activeProductIndex].category}</p>
                    <p className="font-bold text-sm">{rotatingProducts[activeProductIndex].name}</p>
                  </div>
                </div>

                {/* Progress dots */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                  {rotatingProducts.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveProductIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === activeProductIndex ? 'bg-orange-500 w-6' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Strip */}
      <section className="py-10 bg-white/50 backdrop-blur overflow-hidden">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white/80 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white/80 to-transparent z-10"></div>
          <div className="flex animate-scroll-left">
            {[...brandLogos, ...brandLogos, ...brandLogos].map((brand, i) => (
              <div key={i} className="flex-shrink-0 px-12 flex items-center">
                <div className="h-12 w-32 flex items-center justify-center grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all cursor-pointer">
                  <Image src={brand.src} alt={brand.name} width={120} height={48} className="h-8 w-auto object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-orange-600 text-sm font-bold tracking-wider">BROWSE</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-2">Categories</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <div 
                key={i}
                className="scroll-animate from-bottom group cursor-pointer"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="bg-white rounded-3xl p-6 shadow-lg shadow-orange-100 hover:shadow-xl hover:shadow-orange-200 hover:-translate-y-2 transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center p-3 mb-4 shadow-lg`}>
                    <Image src={cat.image} alt={cat.name} width={45} height={45} className="object-contain" />
                  </div>
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{cat.count} products</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "✓", title: "Quality", desc: "Genuine authorized products" },
              { icon: "◐", title: "24/7 Support", desc: "WhatsApp assistance anytime" },
              { icon: "◈", title: "Best Prices", desc: "Competitive pricing guaranteed" },
              { icon: "★", title: "20+ Years", desc: "Two decades of excellence" },
            ].map((item, i) => (
              <div key={i} className="scroll-animate from-bottom text-center" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-14 h-14 mx-auto bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-2xl mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-white/70 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="contact" className="py-20 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-orange-600 text-sm font-bold tracking-wider">TESTIMONIALS</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-2">Customer Reviews</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="scroll-animate from-bottom bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="text-orange-500 text-xl mb-4">{"★".repeat(review.rating)}</div>
                <p className="text-gray-600 mb-6">&quot;{review.text}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-orange-200">
                    {review.name[0]}
                  </div>
                  <span className="font-bold">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-black">P</span>
              </div>
              <span className="text-xl font-black">
                Power<span className="text-orange-400">Zone</span>
              </span>
            </div>
            <p className="text-gray-500">Premium electrical products since 2005.</p>
            <div className="flex gap-3 mt-6">
              {["FB", "IG", "WA"].map((s) => (
                <a key={s} href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 hover:text-orange-400 hover:bg-gray-700 transition-colors cursor-pointer text-xs font-bold">
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-orange-400 mb-4">Store 01</h4>
            <p className="text-gray-500 text-sm">123 Main Market Road</p>
            <p className="text-gray-500 text-sm">+91 98765 43210</p>
          </div>
          <div>
            <h4 className="font-bold text-orange-400 mb-4">Store 02</h4>
            <p className="text-gray-500 text-sm">456 City Center Plaza</p>
            <p className="text-gray-500 text-sm">+91 98765 43211</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-600 text-sm">
          © 2025 PowerZone Electricals
        </div>
      </footer>
    </div>
  );
}
