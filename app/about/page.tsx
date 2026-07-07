import Banner from "../components/banner";
import { Zap, Globe, Shield, Users, Award, Leaf, Clock, MapPin } from "lucide-react";

const page = () => {
  return (
    <div className="pt-20 min-h-screen text-white">
      <Banner title="About" backgroundVideo="/assets/videos/Car_Neon-About-Banner.mp4" />

        {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-4">Our Story</p>
            <h2 className="font-display text-4xl sm:text-5xl font-light mb-6">Driving Change Since 2020</h2>
            <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
              Founded with a vision to accelerate the adoption of electric vehicles, NISHSHIFT started as a small network of charging stations in urban areas. Today, we've grown into a nationwide network, making EV charging accessible to millions.
            </p>
            <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
              Our journey has been driven by innovation, customer feedback, and an unwavering commitment to sustainability. We believe that the future of transportation is electric, and we're building the infrastructure to make that future a reality.
            </p>
            <div className="flex gap-6">
              <div>
                <div className="text-3xl font-bold text-white mb-1">2020</div>
                <p className="text-zinc-500 text-sm">Founded</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">2022</div>
                <p className="text-zinc-500 text-sm">100 Stations</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">2024</div>
                <p className="text-zinc-500 text-sm">500+ Stations</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square from-zinc-800 to-zinc-900 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* <Globe className="text-zinc-700 w-32 h-32" /> */}
                <img src="assets/images/buggati-chiron.jpg" alt="About NISHSHIFT" className="w-full object-cover rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
      

      {/* Features Section */}
      <div className="bg-zinc-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-4">Why Choose Us</p>
            <h2 className="font-display text-4xl sm:text-5xl font-light">The NISHSHIFT Advantage</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-8 hover:border-zinc-600 transition-all">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Zap className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Ultra-Fast Charging</h3>
              <p className="text-zinc-400">Our DC Fast chargers deliver up to 350kW, charging your vehicle in minutes rather than hours.</p>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-8 hover:border-zinc-600 transition-all">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Strategic Locations</h3>
              <p className="text-zinc-400">Find us at highways, shopping centers, and urban areas for convenient charging wherever you go.</p>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-8 hover:border-zinc-600 transition-all">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Shield className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Safe & Secure</h3>
              <p className="text-zinc-400">All our stations are equipped with security cameras and well-lit areas for your peace of mind.</p>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-8 hover:border-zinc-600 transition-all">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Clock className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">24/7 Availability</h3>
              <p className="text-zinc-400">Our stations are open round the clock, ensuring you can charge whenever you need to.</p>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-8 hover:border-zinc-600 transition-all">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Leaf className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Green Energy</h3>
              <p className="text-zinc-400">We're committed to renewable energy, powering our stations with solar and wind sources.</p>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-8 hover:border-zinc-600 transition-all">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Community Support</h3>
              <p className="text-zinc-400">Join our growing community of EV enthusiasts and get exclusive benefits and rewards.</p>
            </div>
          </div>
        </div>
      </div>

  {/* Mission Section */}
      <div className="max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8 py-20 relative">
        <video src="assets/videos/Bugatti-Chiron-Pur-Sport.mp4" autoPlay loop muted className="w-full h-full object-cover rounded-2xl absolute top-0 left-0 z-10"></video>
        <div className="absolute z-10 inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-20">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-4">Our Mission</p>
          <h2 className="font-display text-4xl sm:text-5xl font-light mb-6">Powering the Future of Transportation</h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            NISHSHIFT is revolutionizing the electric vehicle charging experience with a network of fast, reliable, and accessible charging stations across the country. We're committed to making sustainable transportation convenient for everyone.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-20">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">500+</div>
            <p className="text-zinc-500 text-sm uppercase tracking-wider">Charging Stations</p>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">50K+</div>
            <p className="text-zinc-500 text-sm uppercase tracking-wider">Happy Users</p>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">100+</div>
            <p className="text-zinc-500 text-sm uppercase tracking-wider">Cities Covered</p>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">99.9%</div>
            <p className="text-zinc-500 text-sm uppercase tracking-wider">Uptime</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-zinc-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-light mb-6">Ready to Join the Revolution?</h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            Start your journey with NISHSHIFT today. Download our app or find a charging station near you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-8 py-4 rounded-full font-medium text-sm uppercase tracking-wider hover:bg-zinc-200 transition-colors">
              Find a Station
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-full font-medium text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
              Download App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
