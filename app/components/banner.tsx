
const Banner = ({ title, backgroundImage, backgroundVideo }: { title: string; backgroundImage?: string; backgroundVideo?: string }) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center station-banner relative overflow-hidden">
      {backgroundVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={backgroundVideo}
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
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