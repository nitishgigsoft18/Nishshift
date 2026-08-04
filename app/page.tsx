import Hero from "./components/Hero";
import DiscoverSection from "./components/home/DiscoverSection";
import FeatureShowcase from "./components/home/FeatureShowcase";
import HeritageSection from "./components/home/HeritageSection";
// import HomeFooter from "./components/home/HomeFooter";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="bg-black">
      <Hero />
      <DiscoverSection />
      <FeatureShowcase />
      <HeritageSection />
      {/* <Footer /> */}
    </main>
  );
}
