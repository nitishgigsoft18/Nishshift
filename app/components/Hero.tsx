import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-black">
      {/* <Image
        src="/images/bugatti-bolide_.jpg"
        alt="NISHSHIFT premium electric mobility"
        fill
        priority
        className="object-cover object-center scale-105"
        sizes="100vw"
      /> */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/assets/videos/Bugatti-Chiron-Pur-Sport.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 text-center text-white">
        <p className="mb-4 sm:mb-6 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.35em] sm:tracking-[0.45em] text-zinc-300 animate-fade-in">
          Premium Rev Experience
        </p>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight mb-4 sm:mb-6">
          Drive The
          <span className="block italic font-normal mt-1 sm:mt-2">Future</span>
        </h1>

        <p className="max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed mb-8 sm:mb-10 px-2">
          Fast, reliable, and intelligent charging solutions designed for the
          next generation of electric mobility.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none">
          <Link
            href="/stations"
            className="w-full sm:w-auto bg-white text-black px-8 py-3.5 text-sm uppercase tracking-wider rounded-full hover:bg-zinc-200 transition-all duration-300 font-medium text-center"
          >
            Explore Stations
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto border border-white/80 px-8 py-3.5 text-sm uppercase tracking-wider rounded-full hover:bg-white hover:text-black transition-all duration-300 text-center"
          >
            Learn More
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-zinc-400">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
}
