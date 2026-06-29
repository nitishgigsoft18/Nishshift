import Banner from "../components/banner";

const page = () => {
  return (
    <div className="pt-20 min-h-screen text-white">
      <Banner title="About" backgroundImage="/assets/images/about-banner.jpg" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-4">About</p>
        {/* <h1 className="font-display text-4xl sm:text-5xl font-light">About NISHSHIFT</h1> */}
        
      </div>
    </div>
  );
};

export default page;
