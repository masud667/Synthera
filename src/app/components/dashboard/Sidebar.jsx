"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Heart,
  ShoppingCart,
  Package,
  Clock,
  PlusCircle,
  List,
  BarChart,
  Menu,
  X,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function Sidebar({ role, activeRoute, setActiveRoute }) {
  const [isOpen, setIsOpen] = useState(false);

  const userLinks = [
    { name: "Profile", key: "profile", icon: Home },
    { name: "All Cart", key: "all-cart", icon: ShoppingCart },
    { name: "Wishlist", key: "wishlist", icon: Heart },
    { name: "Ordered Items", key: "ordered-item", icon: Package },
    { name: "Pending Delivery", key: "pending-delivery", icon: Clock },
  ];

  const sellerLinks = [
    { name: "Profile", key: "profile", icon: Home },
    { name: "Add Product", key: "add-product", icon: PlusCircle },
    { name: "All Products", key: "all-product", icon: List },
    { name: "Total Sell", key: "total-sell", icon: BarChart },
  ];
  const adminLinks = [
    { name: "Profile", key: "profile", icon: Home },
    { name: "Seller Requests", key: "seller-request", icon: ShieldCheck },
    { name: "Total Sellers", key: "total-sellers", icon: UserCheck },
    { name: "Total Users", key: "total-users", icon: Users },
  ];

  let links = [];
  if (role === "user") {
    links = userLinks;
  } else if (role === "seller") {
    links = sellerLinks;
  } else if (role === "admin") {
    links = adminLinks;
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden text- bg-[#2a67b6] rounded-full p-1  flex justify-between items-center absolute top-[5rem]">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Menu"
          className=" cursor-pointer"
        >
          <FaArrowRight size={20} className="text-white"/>
        </button>
      </div>

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col min-h-screen w-64 bg-[#173e72] text-slate-200 shadow-lg rounded-2xl">
        <div className="p-4 font-bold text-xl border-b">Synthera</div>
        <nav className="flex-1">
          {links.map(({ name, key, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveRoute(key)}
              className={`flex items-center px-4 py-3 w-full text-left transition-colors duration-200 hover:bg-[#1d4c8a] ${
                activeRoute === key ? "bg-[#1d4c8a] font-semibold" : ""
              }`}
            >
              <Icon className="mr-3" size={20} />
              {name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Sidebar for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            ></motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-64 h-full bg-[#173e72] text-slate-200 z-50 flex flex-col shadow-lg"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <div className="font-bold text-xl">Synthera</div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Menu"
                >
                  <X size={28} />
                </button>
              </div>
              <nav className="flex-1">
                {links.map(({ name, key, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveRoute(key);
                      setIsOpen(false);
                    }}
                    className={`flex items-center px-4 py-3 w-full text-left transition-colors duration-200 hover:bg-[#1d4c8a] ${
                      activeRoute === key ? "bg-[#1d4c8a] font-semibold" : ""
                    }`}
                  >
                    <Icon className="mr-3" size={20} />
                    {name}
                  </button>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
