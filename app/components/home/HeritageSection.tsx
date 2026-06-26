import Link from "next/link";

export default function HeritageSection() {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-zinc-500 mb-4">
              NISHSHIFT Sur Mesure
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 sm:mb-8">
              The pinnacle of
              <span className="block italic text-zinc-400 mt-1">electric mobility.</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-xl">
              Heritage, craftsmanship, and innovation — united in every charging
              station we build. We translate vision into reality, creating
              bespoke experiences for the next generation of drivers.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {[
              { value: "500+", label: "Stations" },
              { value: "99.9%", label: "Uptime" },
              { value: "350kW", label: "Max Power" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border border-zinc-800 p-5 sm:p-6 lg:p-8 bg-zinc-950/50 hover:border-zinc-700 transition-colors"
              >
                <p className="orbitron text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider mb-2">
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-zinc-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-zinc-400 text-sm sm:text-base max-w-md">
            Ready to experience the future of charging? Join thousands of drivers already on the network.
          </p>
          <Link
            href="/stations"
            className="shrink-0 w-full sm:w-auto text-center px-8 py-3.5 text-sm uppercase tracking-wider bg-white text-black rounded-full hover:bg-zinc-200 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
