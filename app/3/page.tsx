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

export default function BentoGridPage() {
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
    <div className="min-h-screen bg-stone-100 text-stone-900">
      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-10 py-6 bg-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center">
            <span className="text-stone-100 font-black text-sm">PZ</span>
          </div>
          <span className="text-lg font-black tracking-tight">PowerZone</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-stone-400 hidden md:block">Since 2005</span>
          <a href="#contact" className="bg-stone-900 text-stone-100 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-teal-600 transition-colors cursor-pointer">
            Contact
          </a>
        </div>
      </header>

      {/* Hero - Bento Grid */}
      <section className="px-6 md:px-10 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 auto-rows-[120px]">
            {/* Main Title Block */}
            <div className="col-span-4 md:col-span-5 row-span-3 bg-stone-900 rounded-3xl p-8 flex flex-col justify-between text-stone-100">
              <div>
                <span className="inline-block bg-teal-500 text-stone-900 px-3 py-1 rounded-full text-xs font-bold mb-6">
                  ELECTRICAL SUPERSTORE
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tight">
                  Premium
                  <span className="block text-teal-400">Electricals</span>
                  <span className="block text-stone-500">For Your Home</span>
                </h1>
              </div>
              <p className="text-stone-400 text-sm max-w-md">
                Two decades of excellence. Quality products from world-renowned brands.
              </p>
            </div>

            {/* Stats Block */}
            <div className="col-span-2 md:col-span-3 row-span-1 bg-teal-500 rounded-3xl p-6 flex items-center justify-between">
              <div className="text-center">
                <span className="text-2xl font-black text-stone-900">500+</span>
                <p className="text-xs text-stone-700">Products</p>
              </div>
              <div className="text-center">
                <span className="text-2xl font-black text-stone-900">20</span>
                <p className="text-xs text-stone-700">Years</p>
              </div>
              <div className="text-center">
                <span className="text-2xl font-black text-stone-900">2</span>
                <p className="text-xs text-stone-700">Stores</p>
              </div>
            </div>

            {/* Product Carousel Block */}
            <div className="col-span-2 md:col-span-3 row-span-2 bg-white rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 flex gap-1">
                {rotatingProducts.slice(0, 4).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === activeProductIndex % 4 ? 'bg-teal-500' : 'bg-stone-200'
                    }`}
                  ></div>
                ))}
              </div>
              <div className="h-full flex flex-col items-center justify-center">
                <div className="relative w-24 h-24 md:w-32 md:h-32">
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
                <p className="text-xs text-teal-600 font-bold mt-4">{rotatingProducts[activeProductIndex].category}</p>
                <p className="font-bold text-sm">{rotatingProducts[activeProductIndex].name}</p>
              </div>
            </div>

            {/* Store 1 Block */}
            <div className="col-span-2 row-span-1 bg-white rounded-3xl p-5 flex flex-col justify-center">
              <span className="text-xs text-stone-400 uppercase tracking-wider">Store 01</span>
              <p className="font-bold text-sm mt-1">Main Market</p>
              <p className="text-xs text-stone-400">+91 98765 43210</p>
            </div>

            {/* Store 2 Block */}
            <div className="col-span-2 row-span-1 bg-stone-200 rounded-3xl p-5 flex flex-col justify-center">
              <span className="text-xs text-stone-400 uppercase tracking-wider">Store 02</span>
              <p className="font-bold text-sm mt-1">City Center</p>
              <p className="text-xs text-stone-400">+91 98765 43211</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Strip */}
      <section className="py-8 overflow-hidden">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-stone-100 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-stone-100 to-transparent z-10"></div>
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

      {/* Categories - Card Grid */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-teal-600 text-xs font-bold tracking-widest">BROWSE</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-1">Categories</h2>
            </div>
            <p className="text-stone-400 text-sm mt-2 md:mt-0">Explore our complete range</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <div 
                key={i}
                className="scroll-animate from-bottom group cursor-pointer"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="bg-white rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-16 h-16 bg-stone-100 rounded-xl flex items-center justify-center p-3 mb-4 group-hover:bg-teal-50 transition-colors">
                    <Image src={cat.image} alt={cat.name} width={50} height={50} className="object-contain" />
                  </div>
                  <h3 className="font-bold text-sm">{cat.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-stone-400">{cat.count} products</p>
                    <div className="w-6 h-6 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors">
                      <span className="text-xs">&rarr;</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 px-6 md:px-10 bg-stone-900 text-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "✓", title: "Quality", desc: "Genuine authorized products" },
              { icon: "◐", title: "Support", desc: "24/7 WhatsApp assistance" },
              { icon: "◈", title: "Pricing", desc: "Best competitive rates" },
              { icon: "★", title: "Legacy", desc: "20 years of trust" },
            ].map((item, i) => (
              <div key={i} className="scroll-animate from-bottom bg-stone-800 rounded-2xl p-6" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-10 h-10 bg-teal-500 text-stone-900 rounded-xl flex items-center justify-center text-lg font-bold mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-stone-500 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="contact" className="py-16 px-6 md:px-10 bg-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-teal-600 text-xs font-bold tracking-widest">TESTIMONIALS</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-1">Customer Reviews</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="scroll-animate from-bottom bg-white rounded-2xl p-6" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="text-teal-500 text-lg mb-3">{"★".repeat(review.rating)}</div>
                <p className="text-stone-600 text-sm mb-6">&quot;{review.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-stone-900 text-stone-100 rounded-full flex items-center justify-center font-bold">
                    {review.name[0]}
                  </div>
                  <span className="font-bold text-sm">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-100 py-12 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-stone-900 font-black text-sm">PZ</span>
                </div>
                <span className="text-lg font-black">PowerZone</span>
              </div>
              <p className="text-stone-500 text-sm">Premium electrical products since 2005.</p>
              <div className="flex gap-2 mt-4">
                {["FB", "IG", "WA"].map((s) => (
                  <a key={s} href="#" className="w-8 h-8 bg-stone-800 rounded-lg flex items-center justify-center text-stone-500 hover:text-teal-400 hover:bg-stone-700 transition-colors cursor-pointer text-xs font-bold">
                    {s}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-teal-400 mb-3 text-sm">Store 01</h4>
              <p className="text-stone-500 text-sm">123 Main Market Road</p>
              <p className="text-stone-500 text-sm">+91 98765 43210</p>
            </div>
            <div>
              <h4 className="font-bold text-teal-400 mb-3 text-sm">Store 02</h4>
              <p className="text-stone-500 text-sm">456 City Center Plaza</p>
              <p className="text-stone-500 text-sm">+91 98765 43211</p>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-stone-800 text-center text-stone-600 text-sm">
            © 2025 PowerZone Electricals
          </div>
        </div>
      </footer>
    </div>
  );
}
