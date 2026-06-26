"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, User, MapPin } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const solidHeader = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 z-[999] w-full text-white transition-all duration-500 ${
        solidHeader
          ? "bg-black/95 backdrop-blur-md border-b border-zinc-800/60 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-16 sm:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="relative z-[1001]">
          <span className="orbitron text-lg sm:text-xl md:text-2xl font-bold tracking-[0.2em] sm:tracking-[0.25em]">
            NISHSHIFT
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-xs lg:text-sm uppercase tracking-[0.15em]">
          <Link href="/" className="hover:opacity-60 transition-opacity">
            Home
          </Link>
          <Link href="/about" className="hover:opacity-60 transition-opacity">
            About
          </Link>
          <Link href="/stations" className="hover:opacity-60 transition-opacity">
            Stations
          </Link>
          <Link href="/map" className="hover:opacity-60 transition-opacity flex items-center gap-2">
            <MapPin size={14} />
            Map
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 text-xs lg:text-sm uppercase tracking-wider border border-white/80 rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                <User size={16} />
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-xs lg:text-sm uppercase tracking-wider hover:opacity-60 transition-opacity"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-4 lg:px-5 py-2 text-xs lg:text-sm uppercase tracking-wider bg-white text-black rounded-full hover:bg-zinc-200 transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
          <Link
            href="/stations"
            className="px-4 lg:px-5 py-2 text-xs lg:text-sm uppercase tracking-wider border border-white/80 rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            Explore
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-[1001] p-1"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 h-screen w-full max-w-xs bg-black border-l border-zinc-800 z-[1000] transform transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6">
          <button onClick={() => setIsOpen(false)} aria-label="Close menu">
            <X size={26} />
          </button>
        </div>

        <nav className="flex flex-col gap-6 px-8 py-4 text-base uppercase tracking-[0.15em]">
          <Link href="/" onClick={() => setIsOpen(false)} className="py-2 border-b border-zinc-800">
            Home
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="py-2 border-b border-zinc-800">
            About
          </Link>
          <Link href="/stations" onClick={() => setIsOpen(false)} className="py-2 border-b border-zinc-800">
            Stations
          </Link>
          <Link href="/map" onClick={() => setIsOpen(false)} className="py-2 border-b border-zinc-800 flex items-center gap-2">
            <MapPin size={16} />
            Map
          </Link>
          
          {isLoggedIn ? (
            <Link href="/profile" onClick={() => setIsOpen(false)} className="py-2 border-b border-zinc-800 flex items-center gap-2">
              <User size={16} />
              Profile
            </Link>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsOpen(false)} className="py-2 border-b border-zinc-800">
                Sign In
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)} className="py-2 border-b border-zinc-800">
                Sign Up
              </Link>
            </>
          )}
          
          <Link
            href="/stations"
            onClick={() => setIsOpen(false)}
            className="mt-4 px-6 py-3 text-center border border-white rounded-full hover:bg-white hover:text-black transition"
          >
            Explore
          </Link>
        </nav>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-[999] md:hidden"
        />
      )}
    </header>
  );
}
