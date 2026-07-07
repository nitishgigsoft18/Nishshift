import Link from "next/link";

export default function HomeFooter() {
  return (
    <footer className="bg-black text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <Link href="/">
              <span className="orbitron text-xl sm:text-2xl font-bold tracking-[0.25em]">
                NISHSHIFT
              </span>
            </Link>
            <p className="mt-3 text-sm text-zinc-500 max-w-xs">
              Premium electric charging for the next generation.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-xs sm:text-sm uppercase tracking-[0.15em] text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/stations" className="hover:text-white transition-colors">
              Stations
            </Link>
          </nav>
        </div>

        <div className="mt-10 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row justify-between gap-4 text-xs text-zinc-600">
          <p>&copy; {new Date().getFullYear()} NISHSHIFT. All rights reserved.</p>
          <p className="uppercase tracking-wider">Drive The Future</p>
        </div>
      </div>
    </footer>
  );
}
