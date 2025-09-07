"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles, Zap, ChevronRight, ArrowRight } from "lucide-react";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Summer Collection 2025",
      subtitle: "Redefine Your Style",
      description:
        "Experience fashion that speaks to your soul. Get up to 40% off on our new summer arrivals.",
      image:
        "https://images.pexels.com/photos/5698855/pexels-photo-5698855.jpeg",
      cta: "Shop Collection",
      aiCta: "AI Style Assistant",
      accentColor: "#ec4899",
    },
    {
      title: "Urban Essentials",
      subtitle: "Streetwear Reinvented",
      description:
        "Stand out with our exclusive urban collection designed for the modern city dweller.",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2070&q=80",
      cta: "Explore Urban",
      aiCta: "Find My Urban Style",
      accentColor: "#06b6d4",
    },
    {
      title: "Ethereal Elegance",
      subtitle: "For Your Special Moments",
      description:
        "Captivate everyone with our exquisite evening wear collection designed to make you shine.",
      image:
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2074&q=80",
      cta: "View Collection",
      aiCta: "Style Me for Evening",
      accentColor: "#8b5cf6",
    },
  ];

  // auto slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${slides[currentSlide].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }} // fast smooth fade
        >
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full text-white px-8 md:px-16 lg:px-24">
        <motion.span
          className="text-sm uppercase tracking-widest border border-white/30 rounded-full px-4 py-1.5 mb-6 inline-flex items-center bg-black/30"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Star className="w-4 h-4 mr-2" fill="currentColor" />
          New Collection
        </motion.span>

        <motion.h1
          key={slides[currentSlide].title}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {slides[currentSlide].title}
        </motion.h1>

        <motion.h2
          key={slides[currentSlide].subtitle}
          className="text-xl md:text-2xl font-light mb-6 max-w-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {slides[currentSlide].subtitle}
        </motion.h2>

        <motion.p
          key={slides[currentSlide].description}
          className="text-lg md:text-xl max-w-2xl mb-8 bg-black/30 p-4 rounded-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {slides[currentSlide].description}
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-6">
          <motion.button
            className="btn btn-lg px-6 py-3 text-white font-semibold rounded-full shadow-lg"
            style={{ background: slides[currentSlide].accentColor }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {slides[currentSlide].cta}
            <ChevronRight className="w-5 h-5 ml-2" />
          </motion.button>

          <motion.button
            className="btn btn-outline btn-lg px-6 py-3 rounded-full border-white/60 text-white backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {slides[currentSlide].aiCta}
            <Zap className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white scale-125"
                : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <motion.button
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 btn btn-circle glass"
        onClick={() =>
          setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)
        }
      >
        <ArrowRight className="w-6 h-6 rotate-180" />
      </motion.button>
      <motion.button
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 btn btn-circle glass"
        onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
      >
        <ArrowRight className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default HeroBanner;
