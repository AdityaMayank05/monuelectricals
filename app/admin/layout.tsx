"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-zinc-500 text-sm">Loading admin panel...</span>
                </div>
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto">
                        <span className="text-3xl">🔒</span>
                    </div>
                    <h2 className="text-xl font-bold">Access Restricted</h2>
                    <p className="text-zinc-500 text-sm">Please sign in to access the admin dashboard.</p>
                </div>
            </div>
        );
    }

    const navItems = [
        {
            label: "Dashboard",
            href: "/admin",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg>
            ),
        },
        {
            label: "Products",
            href: "/admin/products",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
            ),
        },
        {
            label: "Categories",
            href: "/admin/categories",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                </svg>
            ),
        },
    ];

    const isActive = (href: string) => {
        if (href === "/admin") return pathname === "/admin";
        return pathname.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
            {/* Sidebar */}
            <aside className="w-72 border-r border-zinc-800/60 bg-gradient-to-b from-zinc-900 to-zinc-950 flex-shrink-0 relative flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-zinc-800/60">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center rounded-xl shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow">
                            <span className="text-zinc-950 font-black text-lg">M</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black tracking-tight text-base leading-none">MONU ELECTRICALS</span>
                            <span className="text-[10px] text-amber-500/70 font-semibold tracking-widest mt-0.5">ADMIN PANEL</span>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-4 mb-3">Navigation</p>
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${active
                                        ? "bg-amber-500/10 text-amber-500 shadow-inner"
                                        : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50"
                                    }`}
                            >
                                <span className={active ? "text-amber-500" : "text-zinc-600"}>{item.icon}</span>
                                {item.label}
                                {active && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-zinc-800/60">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-zinc-800/30">
                        <UserButton afterSignOutUrl="/" />
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-zinc-300">Admin</span>
                            <span className="text-[10px] text-zinc-600">Manage your store</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="sticky top-0 z-10 h-16 border-b border-zinc-800/60 px-8 flex items-center justify-between bg-zinc-950/80 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                        <h1 className="text-lg font-bold text-zinc-200">
                            {navItems.find((i) => isActive(i.href))?.label || "Dashboard"}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                            View Store
                        </Link>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
