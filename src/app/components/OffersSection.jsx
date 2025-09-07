'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Tag, ChevronRight, ArrowRight, ShoppingBag } from 'lucide-react';

const OffersSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 0,
    seconds: 0
  });

  // Sample offers data
  const offers = [
    {
      id: 1,
      title: "Summer Collection",
      description: "Get up to 40% off on summer essentials",
      discount: "40% OFF",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      timeLeft: "12:00:00",
      tag: "HOT",
      color: "bg-red-500"
    },
    {
      id: 2,
      title: "New Arrivals",
      description: "Be the first person to shop our new collection",
      discount: "25% OFF",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      timeLeft: "06:30:00",
      tag: "NEW",
      color: "bg-blue-500"
    },
    {
      id: 3,
      title: "Clearance Sale",
      description: "Last chance to buy with huge discounts",
      discount: "60% OFF",
      image: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      timeLeft: "24:00:00",
      tag: "SALE",
      color: "bg-green-500"
    },
    {
      id: 4,
      title: "New Arrivals",
      description: "Be the first person to shop our new collection",
      discount: "25% OFF",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      timeLeft: "06:30:00",
      tag: "NEW",
      color: "bg-blue-500"
    }
  ];

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const seconds = prevTime.seconds - 1;
        const minutes = seconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
        const hours = minutes < 0 ? prevTime.hours - 1 : prevTime.hours;
        
        return {
          hours: hours < 0 ? 0 : hours,
          minutes: minutes < 0 ? 59 : minutes,
          seconds: seconds < 0 ? 59 : seconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-base-100">
      <div className="w-11/12 mx-auto ">
        {/* Section Header */}
        <motion.div 
          className="text-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h1 className="text-2xl font-bold mb-6">Special Offers</h1>
        
        </motion.div>

      {/* Countdown Timer */}
<motion.div 
  className="relative overflow-hidden rounded-2xl shadow-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between
             bg-gradient-to-r from-pink-600/70 via-purple-700/70 to-blue-900/70 backdrop-blur-lg border border-white/20"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  viewport={{ once: true }}
>
  {/* Glowing animated ring */}
  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-700 opacity-40 blur-2xl animate-pulse" />

  <div className="relative flex items-center mb-6 md:mb-0 z-10">
    <Zap className="w-9 h-9 text-yellow-400 mr-4 animate-bounce" />
    <div>
      <h3 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-300 via-pink-200 to-purple-100 bg-clip-text text-transparent">
        Flash Sale Ending Soon!
      </h3>
      <p className="text-sm md:text-base text-gray-200 mt-1">
        Hurry up before the offers expire
      </p>
    </div>
  </div>
  
  <div className="relative flex space-x-6 text-primary z-10">
    {/* Hours */}
    <div className="flex flex-col items-center">
      <span className="text-3xl font-extrabold bg-white/90 text-gray-900 rounded-lg px-4 py-2 shadow-md transform transition-transform hover:scale-110">
        {timeLeft.hours.toString().padStart(2, '0')}
      </span>
      <span className="text-xs text-gray-300 mt-1 tracking-widest">HOURS</span>
    </div>

    {/* Separator */}
    <span className="text-3xl font-bold text-white pt-1 animate-pulse">:</span>

    {/* Minutes */}
    <div className="flex flex-col items-center">
      <span className="text-3xl font-extrabold bg-white/90 text-gray-900 rounded-lg px-4 py-2 shadow-md transform transition-transform hover:scale-110">
        {timeLeft.minutes.toString().padStart(2, '0')}
      </span>
      <span className="text-xs text-gray-300 mt-1 tracking-widest">MINUTES</span>
    </div>

    {/* Separator */}
    <span className="text-3xl font-bold text-white pt-1 animate-pulse">:</span>

    {/* Seconds */}
    <div className="flex flex-col items-center">
      <span className="text-3xl font-extrabold bg-white/90 text-gray-900 rounded-lg px-4 py-2 shadow-md transform transition-transform hover:scale-110">
        {timeLeft.seconds.toString().padStart(2, '0')}
      </span>
      <span className="text-xs text-gray-300 mt-1 tracking-widest">SECONDS</span>
    </div>
  </div>
</motion.div>


        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offers.map((offer, index) => (
            <motion.div 
              key={offer.id}
              className="bg-base-100 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 border border-base-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Offer Tag */}
              <div className="relative">
                <div className={`absolute top-4 left-4 ${offer.color} text-white px-3 py-1 rounded-full text-sm font-bold z-10`}>
                  {offer.tag}
                </div>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={offer.image} 
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
              </div>

              {/* Offer Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-primary">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                
                <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-bold text-primary">{offer.discount}</span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    Ends in: {offer.timeLeft}
                  </div>
                </div>

                <button className="btn btn-primary w-full group/btn">
                  Shop Now
                  <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Offers Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <button className="btn btn-outline btn-primary group">
            View All Offers
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default OffersSection;