import Image from "next/image";
import Link from "next/link";

const features = [
  {
    tag: "Performance",
    title: "Ultra-Fast Charging",
    description: "Power up in minutes, not hours. Engineered for drivers who demand more from every journey.",
    image: "/images/bugatti-bolide_.jpg",
    align: "left" as const,
  },
  {
    tag: "Intelligence",
    title: "Smart Network",
    description: "Real-time availability, route optimization, and seamless app integration across every station.",
    image: "/images/bugatti-bolide_.jpg",
    align: "right" as const,
  },
  {
    tag: "Luxury",
    title: "Premium Experience",
    description: "Architectural charging hubs designed with the same obsession for detail as the world's finest automobiles.",
    image: "/images/bugatti-bolide_.jpg",
    align: "left" as const,
  },
];

export default function FeatureShowcase() {
  return (
    <section className="bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-zinc-500 mb-4">
            Our Technology
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light">
            Facets of Performance
          </h2>
        </div>

        <div className="flex flex-col gap-16 sm:gap-20 lg:gap-28">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                feature.align === "right" ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-zinc-900">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className={`object-cover transition-transform duration-700 hover:scale-105 ${
                    index % 2 === 1 ? "object-left" : "object-right"
                  }`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="px-0 sm:px-4 lg:px-8">
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3">
                  {feature.tag}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-6">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-6 sm:mb-8 max-w-lg">
                  {feature.description}
                </p>
                <Link
                  href="/stations"
                  className="inline-block text-xs sm:text-sm uppercase tracking-wider border-b border-white/40 pb-1 hover:border-white transition-colors"
                >
                  Learn more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
