"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

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
  { name: "Havells Enticer", category: "CEILING FAN", image: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930951/monuelectricals/fans/havells-enticer-brown.png" },
  { name: "Crompton Venti", category: "EXHAUST FAN", image: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931247/monuelectricals/ventilation-fans/crompton-venti.png" },
  { name: "Atomberg Renesa", category: "BLDC FAN", image: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930937/monuelectricals/fans/atomberg-renesa-white.png" },
  { name: "Sakash Chimney", category: "CHIMNEY", image: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930932/monuelectricals/chimneys/Sakashchimney.png" },
  { name: "Bajaj Artisan", category: "DESIGNER FAN", image: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930940/monuelectricals/fans/bajaj-artisan-grey.png" },
  { name: "Havells Venti", category: "VENTILATION", image: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771931251/monuelectricals/ventilation-fans/haveels-venti.png" },
  { name: "Orient Blanco", category: "MODERN FAN", image: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930970/monuelectricals/fans/orient-blanco-white.png" },
  { name: "Glen Chimney", category: "CHIMNEY", image: "https://res.cloudinary.com/dvza6iqax/image/upload/v1771930925/monuelectricals/chimneys/Glen-automatic-chimney.png" },
];

const reviews = [
  { name: "RAJESH K.", rating: 5, text: "Excellent service and genuine products. Been buying here for 10 years!" },
  { name: "PRIYA S.", rating: 5, text: "Best prices in the city. Staff is very helpful and knowledgeable." },
  { name: "AMIT P.", rating: 5, text: "Quick delivery and great after-sales support. Highly recommended!" },
];

export default function HomePage() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  // Fetch categories from Convex
  const dbCategories = useQuery(api.categories.list);

  // Map DB categories to display format
  const categories = dbCategories?.map((cat) => ({
    name: cat.name.toUpperCase(),
    count: "", // Will be filled by product count
    image: cat.coverImage,
    slug: cat.slug,
  })) ?? [];

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
  }, [dbCategories]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProductIndex((prev) => (prev + 1) % rotatingProducts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Header */}
        <header className="relative z-10 flex justify-between items-center px-6 md:px-12 lg:px-20 py-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-500 flex items-center justify-center">
              <span className="text-zinc-950 font-black text-lg">M</span>
            </div>
            <span className="text-xl font-black tracking-tighter">
              MONU<span className="text-amber-500">ELECTRICALS</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xs text-zinc-500 tracking-widest hidden md:block">EST. 2005</span>
            <a href="#contact" className="border border-amber-500 text-amber-500 px-5 py-2.5 text-sm font-bold hover:bg-amber-500 hover:text-zinc-950 transition-all duration-200 cursor-pointer">
              CONTACT US
            </a>
          </div>
        </header>

        {/* Main Hero Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-100px)] px-6 md:px-12 lg:px-20">
          {/* Left - Rotating Clock */}
          <div className="flex items-center justify-center py-12 order-2 lg:order-1">
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
              {/* Outer rings */}
              <div className="absolute inset-0 rounded-full border border-zinc-800"></div>
              <div className="absolute inset-6 rounded-full border border-zinc-800/50"></div>
              <div className="absolute inset-12 rounded-full border border-dashed border-amber-500/30"></div>

              {/* Rotating thumbnails */}
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
                      style={{ transform: `rotate(${angle}deg) translateY(-130px)` }}
                    >
                      <div
                        className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-zinc-900 border-2 flex items-center justify-center p-2 -ml-6 -mt-6 md:-ml-8 md:-mt-8 transition-all duration-500 ${i === activeProductIndex ? 'border-amber-500 scale-110 bg-zinc-800' : 'border-zinc-700'
                          }`}
                        style={{ transform: `rotate(${activeProductIndex * 45}deg)` }}
                      >
                        <Image src={product.image} alt={product.name} width={40} height={40} className="object-contain" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center Display */}
              <div className="absolute inset-20 md:inset-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto">
                    {rotatingProducts.map((product, i) => (
                      <div
                        key={i}
                        className={`absolute inset-0 transition-all duration-500 ${i === activeProductIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                          }`}
                      >
                        <Image src={product.image} alt={product.name} fill className="object-contain" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-amber-500 font-bold tracking-wider mt-2">{rotatingProducts[activeProductIndex].category}</p>
                  <p className="font-black text-sm text-zinc-300 mt-1">{rotatingProducts[activeProductIndex].name}</p>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-1.5">
                {rotatingProducts.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 transition-all duration-300 ${i === activeProductIndex ? 'w-6 bg-amber-500' : 'w-1.5 bg-zinc-700'
                      }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Text Content */}
          <div className="flex flex-col justify-center py-16 order-1 lg:order-2">
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 mb-8">
                <div className="w-2 h-2 bg-amber-500 animate-pulse"></div>
                <span className="text-xs font-bold tracking-widest text-zinc-400">ELECTRICAL SUPERSTORE</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter">
                <span className="text-amber-500">PREMIUM</span>
                <span className="block text-zinc-100">ELECTRICALS</span>
                <span className="block text-zinc-600">FOR YOUR HOME</span>
              </h1>

              <p className="text-zinc-500 mt-8 text-lg leading-relaxed max-w-md">
                Two decades of excellence. Quality products from world-renowned brands at competitive prices.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-zinc-800">
                <div>
                  <span className="text-4xl font-black text-amber-500">500+</span>
                  <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Products</p>
                </div>
                <div>
                  <span className="text-4xl font-black">20</span>
                  <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Years</p>
                </div>
                <div>
                  <span className="text-4xl font-black">2</span>
                  <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Stores</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Strip - Original Colors, No Grayscale */}
      <section className="py-8 bg-zinc-900 border-y border-zinc-800 overflow-hidden">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-900 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-900 to-transparent z-10"></div>
          <div className="flex animate-scroll-left">
            {[...brandLogos, ...brandLogos, ...brandLogos].map((brand, i) => (
              <div key={i} className="flex-shrink-0 px-8 flex items-center">
                <div className="h-12 w-32 bg-white rounded-lg flex items-center justify-center px-4 py-2 hover:shadow-lg hover:shadow-amber-500/10 transition-shadow duration-200 cursor-pointer">
                  <Image src={brand.src} alt={brand.name} width={100} height={40} className="h-7 w-auto object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="text-amber-500 text-xs font-bold tracking-widest">BROWSE</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mt-2">CATEGORIES</h2>
            </div>
            <p className="text-zinc-500 text-sm mt-4 md:mt-0">Explore our complete range</p>
          </div>

          {!dbCategories ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="relative h-56 md:h-72 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden animate-pulse">
                  <div className="absolute bottom-0 left-0 right-0 pt-10 pb-5 px-5">
                    <div className="h-5 bg-zinc-800 rounded w-24"></div>
                    <div className="h-3 bg-zinc-800 rounded w-16 mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {categories.map((cat, i) => (
                <Link
                  key={i}
                  href={`/products/${cat.slug}`}
                  className="scroll-animate from-bottom group cursor-pointer block"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="relative h-56 md:h-72 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)] hover:border-amber-500/40">
                    {/* Product image - fills card */}
                    <div className="absolute inset-0 flex items-center justify-center p-8 md:p-10">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        width={160}
                        height={160}
                        className="object-contain w-full h-full max-w-[140px] md:max-w-[160px] transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    {/* Bottom label overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent pt-10 pb-5 px-5">
                      <h3 className="font-black text-base md:text-lg text-zinc-100 group-hover:text-amber-400 transition-colors duration-200">
                        {cat.name}
                      </h3>
                    </div>

                    {/* Hover accent line */}
                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-amber-500 group-hover:w-full transition-all duration-500"></div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Value Props - Always Visible, Elevate + Glow on Hover */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "✓", title: "QUALITY", desc: "Only genuine authorized products from top brands" },
              { icon: "◐", title: "24/7 SUPPORT", desc: "WhatsApp assistance anytime you need" },
              { icon: "◈", title: "BEST PRICES", desc: "Competitive pricing guaranteed" },
              { icon: "★", title: "20+ YEARS", desc: "Two decades of trust and excellence" },
            ].map((item, i) => (
              <div
                key={i}
                className="scroll-animate from-bottom text-center bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] hover:border-amber-500/40 cursor-pointer"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl text-amber-500 mb-4 rounded-lg">
                  {item.icon}
                </div>
                <h3 className="font-black text-lg text-zinc-100">{item.title}</h3>
                <p className="text-zinc-400 text-sm mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="contact" className="py-24 px-6 md:px-12 lg:px-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-500 text-xs font-bold tracking-widest">TESTIMONIALS</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mt-2">CUSTOMER REVIEWS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="scroll-animate from-bottom bg-zinc-900 border border-zinc-800 p-8" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="text-amber-500 text-lg mb-4">{"★".repeat(review.rating)}</div>
                <p className="text-zinc-400 mb-6">&quot;{review.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500 text-zinc-950 flex items-center justify-center font-black">
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
      <footer className="bg-zinc-900 border-t border-zinc-800 py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 flex items-center justify-center">
                <span className="text-zinc-950 font-black text-lg">M</span>
              </div>
              <span className="text-xl font-black tracking-tighter">
                MONU<span className="text-amber-500">ELECTRICALS</span>
              </span>
            </div>
            <p className="text-zinc-500 mt-4">Premium electrical products since 2005.</p>
            <div className="flex gap-3 mt-6">
              {["FB", "IG", "WA"].map((s) => (
                <a key={s} href="#" className="w-10 h-10 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-amber-500 hover:border-amber-500 transition-colors duration-200 cursor-pointer text-xs font-bold">
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-black text-amber-500 mb-4 text-sm">BRANCH 01</h4>
            <p className="text-zinc-500 text-sm">Sector -10 , vasundhara , Ghaziabad,UP</p>
            <p className="text-zinc-500 text-sm">9213684115</p>
          </div>
          <div>
            <h4 className="font-black text-amber-500 mb-4 text-sm">BRANCH 02</h4>
            <p className="text-zinc-500 text-sm">Plot No-10, Govind Vihar II, Govindpuram, Ghaziabad,UP</p>
            <p className="text-zinc-500 text-sm">9810468106</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-800 text-center text-zinc-600 text-sm">
          © 2025 MONU ELECTRICALS
        </div>
      </footer>
    </div>
  );
}
