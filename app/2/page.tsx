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

export default function MagazineEditorialPage() {
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
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section - Magazine Editorial Style */}
      <section className="min-h-screen relative overflow-hidden">
        {/* Large Background Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[30vw] font-black text-gray-100 tracking-tighter leading-none select-none">
            PZ
          </span>
        </div>

        {/* Header */}
        <header className="relative z-20 flex justify-between items-center px-6 md:px-12 lg:px-20 py-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black tracking-tighter">
              POWER<span className="text-rose-500">ZONE</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <span className="text-xs font-bold tracking-widest text-gray-400 hover:text-gray-900 cursor-pointer transition-colors">PRODUCTS</span>
            <span className="text-xs font-bold tracking-widest text-gray-400 hover:text-gray-900 cursor-pointer transition-colors">BRANDS</span>
            <span className="text-xs font-bold tracking-widest text-gray-400 hover:text-gray-900 cursor-pointer transition-colors">STORES</span>
          </nav>
          <a href="#contact" className="bg-gray-900 text-white px-6 py-3 text-xs font-bold tracking-wider hover:bg-rose-500 transition-colors cursor-pointer">
            VISIT US
          </a>
        </header>

        {/* Main Hero - Asymmetric Grid */}
        <div className="relative z-10 grid grid-cols-12 gap-6 px-6 md:px-12 lg:px-20 min-h-[calc(100vh-120px)]">
          {/* Left Column - Text */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-center py-12">
            <div className="mb-6">
              <div className="inline-block border-l-4 border-rose-500 pl-4">
                <span className="text-xs font-bold tracking-widest text-gray-400">SINCE 2005</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.85] tracking-tighter">
              THE
              <span className="block italic text-rose-500">ELECTRICAL</span>
              <span className="block">EXPERTS</span>
            </h1>

            <p className="text-gray-500 mt-8 text-lg max-w-sm leading-relaxed">
              Premium products. Trusted brands. Exceptional service for over two decades.
            </p>

            {/* Editorial Stats */}
            <div className="flex gap-12 mt-12">
              <div>
                <span className="text-5xl font-black">500</span>
                <span className="text-rose-500 text-3xl font-black">+</span>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Products</p>
              </div>
              <div>
                <span className="text-5xl font-black">20</span>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Years</p>
              </div>
            </div>
          </div>

          {/* Center - Product Clock */}
          <div className="col-span-12 lg:col-span-4 flex items-center justify-center py-12">
            <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px]">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
              <div className="absolute inset-4 rounded-full border border-gray-100"></div>
              <div className="absolute inset-8 rounded-full border border-dashed border-rose-200"></div>
              
              {/* Rotating products */}
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
                      style={{ transform: `rotate(${angle}deg) translateY(-120px)` }}
                    >
                      <div 
                        className={`w-14 h-14 rounded-full bg-white shadow-lg border-2 flex items-center justify-center p-2 -ml-7 -mt-7 transition-all duration-500 ${
                          i === activeProductIndex ? 'border-rose-500 scale-125 shadow-rose-100 shadow-xl' : 'border-gray-100'
                        }`}
                        style={{ transform: `rotate(${activeProductIndex * 45}deg)` }}
                      >
                        <Image src={product.image} alt={product.name} width={36} height={36} className="object-contain" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center display */}
              <div className="absolute inset-16 md:inset-20 rounded-full bg-white shadow-2xl flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto">
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
                  <p className="text-xs text-rose-500 font-bold tracking-wider mt-2">{rotatingProducts[activeProductIndex].category}</p>
                  <p className="font-black text-sm mt-1">{rotatingProducts[activeProductIndex].name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Vertical Info */}
          <div className="col-span-12 lg:col-span-3 flex flex-col justify-center py-12">
            <div className="space-y-8">
              <div className="border-l-2 border-gray-900 pl-4">
                <p className="text-xs text-gray-400 uppercase tracking-widest">Store 01</p>
                <p className="font-bold mt-1">Main Market</p>
                <p className="text-sm text-gray-400">+91 98765 43210</p>
              </div>
              <div className="border-l-2 border-rose-500 pl-4">
                <p className="text-xs text-gray-400 uppercase tracking-widest">Store 02</p>
                <p className="font-bold mt-1">City Center</p>
                <p className="text-sm text-gray-400">+91 98765 43211</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-12">
              {["IG", "FB", "WA"].map((s) => (
                <a key={s} href="#" className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-900 transition-all cursor-pointer text-xs font-bold">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Strip - Light */}
      <section className="py-10 bg-gray-50 border-y border-gray-100 overflow-hidden">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          <div className="flex animate-scroll-left">
            {[...brandLogos, ...brandLogos, ...brandLogos].map((brand, i) => (
              <div key={i} className="flex-shrink-0 px-12 flex items-center">
                <div className="h-12 w-32 flex items-center justify-center grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-pointer">
                  <Image src={brand.src} alt={brand.name} width={120} height={48} className="h-8 w-auto object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Magazine Grid */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 mb-16">
            <div className="col-span-12 md:col-span-6">
              <span className="text-rose-500 text-xs font-bold tracking-widest">COLLECTIONS</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mt-2 italic">Categories</h2>
            </div>
            <div className="col-span-12 md:col-span-6 flex items-end">
              <p className="text-gray-400 max-w-sm">Explore our carefully curated selection of premium electrical products.</p>
            </div>
          </div>

          {/* Masonry-like grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <div 
                key={i}
                className={`scroll-animate from-bottom group cursor-pointer ${i === 0 ? 'md:row-span-2' : ''}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`relative bg-gray-50 overflow-hidden group-hover:bg-gray-100 transition-colors ${i === 0 ? 'h-full min-h-[300px]' : 'h-48 md:h-56'}`}>
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <Image src={cat.image} alt={cat.name} width={150} height={150} className="object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white to-transparent">
                    <h3 className="font-black text-lg">{cat.name}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-400">{cat.count} products</p>
                      <span className="text-rose-500 font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { num: "01", title: "QUALITY", desc: "Genuine authorized products" },
              { num: "02", title: "SUPPORT", desc: "24/7 WhatsApp assistance" },
              { num: "03", title: "PRICING", desc: "Best competitive rates" },
              { num: "04", title: "LEGACY", desc: "20 years of trust" },
            ].map((item, i) => (
              <div key={i} className="scroll-animate from-bottom text-center md:text-left border-t border-gray-700 pt-6" style={{ animationDelay: `${i * 100}ms` }}>
                <span className="text-4xl font-black text-gray-700">{item.num}</span>
                <h3 className="font-black text-lg mt-4 text-rose-400">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="contact" className="py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 mb-16">
            <div className="col-span-12 md:col-span-8">
              <span className="text-rose-500 text-xs font-bold tracking-widest">TESTIMONIALS</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mt-2 italic">What Our Customers Say</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="scroll-animate from-bottom" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="text-5xl font-black text-gray-100 mb-4">&ldquo;</div>
                <div className="text-rose-500 mb-4">{"★".repeat(review.rating)}</div>
                <p className="text-gray-600 text-lg mb-6">{review.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-900 text-white flex items-center justify-center font-black text-lg">
                    {review.name[0]}
                  </div>
                  <span className="font-black">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-6">
              <span className="text-4xl font-black tracking-tighter">
                POWER<span className="text-rose-500">ZONE</span>
              </span>
              <p className="text-gray-500 mt-4 max-w-sm">Premium electrical products since 2005. Quality you can trust.</p>
            </div>
            <div className="col-span-6 md:col-span-3">
              <h4 className="font-black text-rose-400 mb-4 text-sm">STORE 01</h4>
              <p className="text-gray-500 text-sm">123 Main Market Road</p>
              <p className="text-gray-500 text-sm">+91 98765 43210</p>
            </div>
            <div className="col-span-6 md:col-span-3">
              <h4 className="font-black text-rose-400 mb-4 text-sm">STORE 02</h4>
              <p className="text-gray-500 text-sm">456 City Center Plaza</p>
              <p className="text-gray-500 text-sm">+91 98765 43211</p>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">© 2025 POWERZONE ELECTRICALS</p>
            <div className="flex gap-4">
              {["Facebook", "Instagram", "WhatsApp"].map((s) => (
                <a key={s} href="#" className="text-gray-500 hover:text-rose-400 transition-colors cursor-pointer text-sm">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
