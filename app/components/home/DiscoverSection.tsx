import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const cards = [
  {
    title: "Discover NISHSHIFT",
    subtitle: "Our Vision",
    description: "Redefining electric mobility with precision engineering and uncompromising design.",
    href: "/about",
    label: "Learn more",
  },
  {
    title: "Our Network",
    subtitle: "Charging Stations",
    description: "A growing network of premium charging stations built for performance and convenience.",
    href: "/stations",
    label: "View stations",
  },
  {
    title: "The Experience",
    subtitle: "Premium Service",
    description: "Every detail crafted to deliver a seamless, luxury-grade charging experience.",
    href: "/about",
    label: "Explore",
  },
];

export default function DiscoverSection() {
  return (
    <section className="bg-black text-white py-20 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 sm:mb-16 lg:mb-20">
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-zinc-500 mb-4">
            La Maison NISHSHIFT
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
            Rooted in innovation.
            <span className="block italic text-zinc-400 mt-1">Built for the future.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative flex flex-col justify-between min-h-[280px] sm:min-h-[320px] p-6 sm:p-8 border border-zinc-800 bg-zinc-950/50 hover:border-zinc-600 hover:bg-zinc-900/80 transition-all duration-500"
            >
              <div>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-zinc-500 mb-3">
                  {card.subtitle}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-light mb-4 group-hover:text-zinc-200 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <span className="mt-8 inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider text-zinc-300 group-hover:text-white transition-colors">
                {card.label}
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
