"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Store } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import axios from "axios";

const salesData = [
  { month: "Jan", sales: 400 },
  { month: "Feb", sales: 600 },
  { month: "Mar", sales: 800 },
  { month: "Apr", sales: 500 },
  { month: "May", sales: 900 },
  { month: "Jun", sales: 750 },
];

const categoryData = [
  { name: "T-Shirts", value: 400 },
  { name: "Jeans", value: 300 },
  { name: "Dresses", value: 300 },
  { name: "Accessories", value: 200 },
];

const COLORS = ["#FFBB38", "#ff7aa2", "#7b61ff", "#36d399"];

export default function SellerProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user/me");
        setUser(res.data.user);
      } catch (err) {
        console.error(
          "Error fetching user:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Top Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" bg-[#173e72] p-6 rounded-xl shadow-lg"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Profile Image */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400 flex items-center justify-center text-white text-3xl font-bold">
            S
          </div>

          {/* Seller Info */}
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white">Synthera Store</h2>
            <p className="text-gray-200">{user?.name}</p>
            <div className="flex justify-center sm:justify-start gap-4 mt-2 text-gray-200 text-sm">
              <div className="flex items-center gap-1">
                <Mail size={14} /> {user?.email}
              </div>
              <div className="flex items-center gap-1">
                <Phone size={14} /> +880 1234-567890
              </div>
            </div>
            <div className="flex justify-center sm:justify-start gap-3 text-gray-200 text-sm mt-2">
              <div className="flex items-center gap-1">
                <MapPin size={14} /> Dhaka, Bangladesh
              </div>
              <div className="flex items-center gap-1">
                <Store size={14} /> Member since 2023
              </div>
            </div>
            <span className="mt-2 inline-block px-4 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
              Seller
            </span>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 "
      >
        <StatCard title="Total Products" value="128" />
        <StatCard title="Total Sales" value="$24,120" />
        <StatCard title="Orders" value="1,024" />
        <StatCard title="Visitors" value="24.5k" />
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-2 text-white bg-[#173e72] rounded-xl p-6 shadow"
        >
          <h3 className="font-semibold mb-4">Monthly Sales Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#2f7de4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white bg-[#173e72] rounded-xl p-6 shadow"
        >
          <h3 className="font-semibold mb-4">Top Categories</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="px-4 py-7 bg-[#1c4c8b] rounded-lg shadow text-center"
    >
      <div className="text-xs text-gray-200">{title}</div>
      <div className="text-xl font-bold mt-1">{value}</div>
    </motion.div>
  );
}
