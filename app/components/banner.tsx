
const Banner = ({ title, backgroundImage }: { title: string; backgroundImage?: string }) => {
  return (
    <div 
      className="min-h-[400px] flex items-center justify-center station-banner relative bg-cover bg-bottom bg-no-repeat" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-5xl font-semibold text-white">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Banner;