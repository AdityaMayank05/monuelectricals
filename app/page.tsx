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
  { name: "CEILING FANS", count: "28+", image: "/assets/category-cover/fan-cover.png" },
  { name: "VENTILATION", count: "12+", image: "/assets/category-cover/haveels-venti.png" },
  { name: "SWITCHGEAR", count: "50+", image: "/assets/category-cover/switch-cover.png" },
  { name: "CHIMNEYS", count: "8+", image: "/assets/category-cover/sakash-automatic-chimney.png" },
  { name: "WIRES", count: "20+", image: "/assets/category-cover/havells-wire.png" },
  { name: "LIGHTING", count: "35+", image: "/assets/category-cover/celing-light.png" },
];

const reviews = [
  { name: "RAJESH K.", rating: 5, text: "Excellent service and genuine products. Been buying here for 10 years!" },
  { name: "PRIYA S.", rating: 5, text: "Best prices in the city. Staff is very helpful and knowledgeable." },
  { name: "AMIT P.", rating: 5, text: "Quick delivery and great after-sales support. Highly recommended!" },
];

export default function Page5() {
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
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero - Stacked Sections with Rotating Display */}
      <section className="min-h-screen flex flex-col">
        {/* Top Bar */}
        <header className="flex justify-between items-center px-6 md:px-12 lg:px-20 py-6 bg-white border-b border-gray-100">
          <div className="flex items-center gap-6">
            <span className="text-2xl font-black tracking-tighter">
              POWER<span className="text-red-500">.</span>ZONE
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-400 hidden md:block">Since 2005</span>
            <a href="#contact" className="bg-gray-900 text-white px-5 py-2.5 text-sm font-bold hover:bg-red-500 transition-colors cursor-pointer">
              CONTACT
            </a>
          </div>
        </header>

        {/* Main Hero Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)]">
          {/* Left - Text Content */}
          <div className="lg:col-span-5 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-16 bg-white">
            <div className="max-w-lg">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-red-500"></div>
                <span className="text-xs font-bold tracking-widest text-red-500">ELECTRICAL SUPERSTORE</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter">
                Premium
                <span className="block">Electricals</span>
                <span className="block text-gray-300">Since 2005</span>
              </h1>

              <p className="text-gray-500 mt-8 text-lg leading-relaxed max-w-md">
                Quality products from world-renowned brands. Two decades of trust and service excellence.
              </p>

              {/* Stats Row */}
              <div className="flex gap-10 mt-12">
                <div>
                  <span className="text-4xl font-black">500<span className="text-red-500">+</span></span>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Products</p>
                </div>
                <div>
                  <span className="text-4xl font-black">20</span>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Years</p>
                </div>
                <div>
                  <span className="text-4xl font-black">2</span>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Stores</p>
                </div>
              </div>

              {/* Store Locations */}
              <div className="flex gap-6 mt-12">
                <div className="flex items-start gap-3">
                  <div className="w-1 h-12 bg-red-500"></div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase">Store 01</p>
                    <p className="font-bold">Main Market</p>
                    <p className="text-sm text-gray-400">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-12 bg-gray-200"></div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase">Store 02</p>
                    <p className="font-bold">City Center</p>
                    <p className="text-sm text-gray-400">+91 98765 43211</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Product Display with Clock Animation */}
          <div className="lg:col-span-7 bg-gray-100 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #d1d5db 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>

            {/* Rotating Clock Display */}
            <div className="relative h-full flex items-center justify-center py-12">
              <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px]">
                {/* Clock rings */}
                <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
                <div className="absolute inset-8 rounded-full border border-gray-200"></div>
                <div className="absolute inset-16 rounded-full border border-dashed border-red-200"></div>

                {/* Rotating product thumbnails */}
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
                        style={{ transform: `rotate(${angle}deg) translateY(-145px)` }}
                      >
                        <div 
                          className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-md border-2 flex items-center justify-center p-1.5 -ml-6 -mt-6 md:-ml-7 md:-mt-7 transition-all duration-500 ${
                            i === activeProductIndex ? 'border-red-500 scale-125 shadow-red-100 shadow-lg' : 'border-gray-100'
                          }`}
                          style={{ transform: `rotate(${activeProductIndex * 45}deg)` }}
                        >
                          <Image src={product.image} alt={product.name} width={36} height={36} className="object-contain" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Center active product */}
                <div className="absolute inset-24 md:inset-28 rounded-full bg-white shadow-xl flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto">
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
                    <div className="mt-3">
                      <p className="text-xs text-red-500 font-bold tracking-wider">{rotatingProducts[activeProductIndex].category}</p>
                      <p className="font-black text-sm mt-1">{rotatingProducts[activeProductIndex].name}</p>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3">
                  <span className="text-xs text-gray-400 font-mono">
                    {String(activeProductIndex + 1).padStart(2, '0')}
                  </span>
                  <div className="w-32 h-0.5 bg-gray-200 overflow-hidden rounded-full">
                    <div 
                      className="h-full bg-red-500 transition-all duration-300"
                      style={{ width: `${((activeProductIndex + 1) / rotatingProducts.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">
                    {String(rotatingProducts.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Strip */}
      <section className="py-8 bg-white border-y border-gray-100 overflow-hidden">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
          <div className="flex animate-scroll-left">
            {[...brandLogos, ...brandLogos, ...brandLogos].map((brand, i) => (
              <div key={i} className="flex-shrink-0 px-10 flex items-center">
                <div className="h-10 w-28 flex items-center justify-center grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all cursor-pointer">
                  <Image src={brand.src} alt={brand.name} width={100} height={40} className="h-7 w-auto object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Stacked List */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-red-500"></div>
                <span className="text-xs font-bold tracking-widest text-red-500">BROWSE</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Categories</h2>
            </div>
          </div>

          <div className="space-y-2">
            {categories.map((cat, i) => (
              <div 
                key={i}
                className="scroll-animate from-left group cursor-pointer"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center justify-between p-6 bg-gray-50 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  <div className="flex items-center gap-6">
                    <span className="text-3xl font-black text-gray-200 group-hover:text-gray-700 transition-colors w-12">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 group-hover:bg-gray-800 transition-colors">
                      <Image src={cat.image} alt={cat.name} width={50} height={50} className="object-contain" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg">{cat.name}</h3>
                      <p className="text-sm text-gray-400">{cat.count} products</p>
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-gray-300 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-800">
            {[
              { num: "01", title: "QUALITY", desc: "Only genuine authorized products" },
              { num: "02", title: "SUPPORT", desc: "24/7 WhatsApp assistance" },
              { num: "03", title: "PRICING", desc: "Best competitive prices" },
              { num: "04", title: "LEGACY", desc: "20 years of trust" },
            ].map((item, i) => (
              <div key={i} className="scroll-animate from-bottom bg-gray-900 p-8 group" style={{ animationDelay: `${i * 100}ms` }}>
                <span className="text-5xl font-black text-gray-800 group-hover:text-red-500/30 transition-colors">{item.num}</span>
                <h3 className="font-black text-lg mt-6 group-hover:text-red-500 transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="contact" className="py-24 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-red-500"></div>
                <span className="text-xs font-bold tracking-widest text-red-500">TESTIMONIALS</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Reviews</h2>
            </div>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">From Google Reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="scroll-animate from-bottom bg-white p-8 border-l-4 border-red-500" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="text-red-500 text-lg mb-4">{"★".repeat(review.rating)}</div>
                <p className="text-gray-600 mb-6">&quot;{review.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-900 text-white flex items-center justify-center font-black">
                    {review.name[0]}
                  </div>
                  <span className="font-black text-sm">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <span className="text-3xl font-black tracking-tighter">
              POWER<span className="text-red-500">.</span>ZONE
            </span>
            <p className="text-gray-500 mt-4 max-w-md">Premium electrical products since 2005.</p>
            <div className="flex gap-3 mt-6">
              {["FB", "IG", "WA"].map((s) => (
                <a key={s} href="#" className="w-10 h-10 border border-gray-700 flex items-center justify-center text-gray-500 hover:text-white hover:border-red-500 transition-colors cursor-pointer text-xs font-bold">
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-black text-red-500 mb-4 text-sm">STORE 01</h4>
            <p className="text-gray-500 text-sm">123 Main Market Road</p>
            <p className="text-gray-500 text-sm">+91 98765 43210</p>
          </div>
          <div>
            <h4 className="font-black text-red-500 mb-4 text-sm">STORE 02</h4>
            <p className="text-gray-500 text-sm">456 City Center Plaza</p>
            <p className="text-gray-500 text-sm">+91 98765 43211</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-600 text-sm">
          © 2025 POWERZONE ELECTRICALS
        </div>
      </footer>
    </div>
  );
}
