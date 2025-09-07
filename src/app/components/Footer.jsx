import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
export default function Footer() {
    const navItems = (
    <>
      <li><Link  href="/" >Home</Link></li>
      <li><Link  href="/Shop">Products</Link></li>
      <li><Link  href="/dashboard">Dashboard</Link></li>
       <li><Link  href="/" >Synthera AI</Link></li>
    </>
  );

  return (
    <footer className="bg-base-100 text-base-content pt-10">
      <div className="w-11/12 mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div>
            <h2 className="text-2xl font-bold text-base-content mb-2">Synthera</h2>
            <p className="text-base-content">
              Trendy fashion for everyone. Stay stylish and shop the latest collections.
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="hover:text-pink-500"><Instagram /></a>
              <a href="#" className="hover:text-blue-500"><Facebook /></a>
              <a href="#" className="hover:text-blue-400"><Twitter /></a>
              <a href="#" className="hover:text-red-500"><Youtube /></a>
            </div>
          </div>

          {/* Navigation links */}
          <div className="flex justify-between md:justify-center md:space-x-10">
            <ul>
                {navItems}
            </ul>
          </div>

          {/* Newsletter Subscribe */}
<div className="flex flex-col sm:flex-col md:flex-col lg:flex-col gap-4">
  <h3 className="text-lg font-semibold mb-2 text-base-content">Subscribe to our Newsletter</h3>
  <p className="text-base-content mb-2">Get the latest trends, offers, and fashion updates directly to your inbox.</p>

  <form className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
    <input
      type="email"
      placeholder="Enter your email"
      className="input py-3 w-full input-bordered flex-1 text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      required
    />
    <button
      type="submit"
      className="btn btn-pink flex-none hover:scale-105 transition-transform duration-200"
    >
      Subscribe
    </button>
  </form>
</div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Synthera. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
