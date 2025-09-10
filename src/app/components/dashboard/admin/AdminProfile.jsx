"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GiCheckMark } from "react-icons/gi";
import { Pie, Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { User, Users, DollarSign } from "lucide-react";
import { FaMarkdown } from "react-icons/fa";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
);

export default function AdminProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users");
        setUser(res.data.users);
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

  const filteredUser = user?.filter(
    (res) => res.email === "admin@synthera.com"
  );
  const totalUser = user?.filter((res) => res.role === "user");
  const totalSeller = user?.filter((res) => res.role === "seller");

  /**  PIE CHART DATA  */
  const pieData = {
    labels: ["Users", "Sellers"],
    datasets: [
      {
        data: [totalUser?.length || 0, totalSeller?.length || 0],
        backgroundColor: ["#facc15", "#1d4ed8"],
        borderWidth: 0,
      },
    ],
  };
  /**  REVENUE LINE CHART DATA  */
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [5000, 7000, 8000, 6500, 9000, 11000, 13000],
        borderColor: "#facc15",
        backgroundColor: "rgba(250, 204, 21, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };
  /**  BAR CHART DATA (Sales by Category) */
  const barData = {
    labels: ["Electronics", "Fashion", "Home", "Beauty", "Sports"],
    datasets: [
      {
        label: "Sales Count",
        data: [450, 320, 280, 150, 200],
        backgroundColor: "#facc15",
      },
    ],
  };
  /**  DOUGHNUT CHART DATA (Revenue Breakdown by Category) */
  const revenueBreakdownData = {
    labels: ["Electronics", "Fashion", "Home", "Beauty", "Sports"],
    datasets: [
      {
        data: [20000, 15000, 12000, 8000, 6000],
        backgroundColor: [
          "#facc15",
          "#3b82f6",
          "#10b981",
          "#ef4444",
          "#a855f7",
        ],
        borderWidth: 0,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#fff" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "#2564b6" },
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "#2564b6" },
      },
    },
  };


  if (loading)
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#173e72] text-white p-6 rounded-xl shadow-lg space-y-6"
    >
      {/* ------------ ADMIN INFO ------------ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-center md:items-start gap-6"
      >
        <img
          src="https://i.ibb.co/S5p5FzT/5.jpg"
          alt="Admin"
          className="w-24 h-24 rounded-full border-4 border-yellow-400 object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <p className="text-gray-300">Name: {filteredUser[0]?.name}</p>
          <p className="text-gray-300">Email: {filteredUser[0]?.email}</p>
          <p className="text-yellow-400 font-semibold">Role: Admin</p>
        </div>
      </motion.div>

      {/* ------------ STATS CARDS ------------ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div className="bg-[#2564b6] p-4 rounded-lg flex items-center gap-3">
          <User size={28} className="text-yellow-400" />
          <div>
            <p className="text-sm text-gray-300">Total Users</p>
            <h3 className="text-xl font-bold">{totalUser.length}</h3>
          </div>
        </motion.div>

        <motion.div className="bg-[#2564b6] p-4 rounded-lg flex items-center gap-3">
          <Users size={28} className="text-yellow-400" />
          <div>
            <p className="text-sm text-gray-300">Total Sellers</p>
            <h3 className="text-xl font-bold">{totalSeller.length}</h3>
          </div>
        </motion.div>

        <motion.div className="bg-[#2564b6] p-4 rounded-lg flex items-center gap-3">
          <DollarSign size={28} className="text-yellow-400" />
          <div>
            <p className="text-sm text-gray-300">Total Sales</p>
            <h3 className="text-xl font-bold">$85,000</h3>
          </div>
        </motion.div>
      </div>

      {/* ------------ CHARTS GRID (2x2 layout) ------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#1b4a88] p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Monthly Revenue ($)</h3>
          <div className="h-64">
            <Line data={revenueData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#1b4a88] p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
          <div className="h-64">
            <Bar data={barData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#1b4a88] p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">
            Users vs Sellers Distribution
          </h3>
          <div className="h-64 flex justify-center">
            <Pie
              data={pieData}
              options={{
                plugins: {
                  legend: { labels: { color: "#fff" } },
                },
              }}
            />
          </div>
        </motion.div>

        {/* Revenue Breakdown Doughnut Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#1b4a88] p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">
            Revenue Breakdown by Category
          </h3>
          <div className="h-64 flex justify-center">
            <Doughnut
              data={revenueBreakdownData}
              options={{
                plugins: {
                  legend: { labels: { color: "#fff" } },
                },
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* ------------ QUICK INSIGHTS ------------ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#2564b6] p-6 rounded-xl"
      >
        <h3 className="text-lg font-semibold mb-4">Quick Insights</h3>
        <ul className="space-y-2 text-gray-200">
          <li className="flex items-center gap-3">
            <GiCheckMark className="text-yellow-400" />
            <span> 90% of sellers are active this month</span>
          </li>
          <li className="flex items-center gap-3">
            <GiCheckMark className="text-yellow-400" />{" "}
            <span>Top-selling category: Electronics</span>
          </li>
          <li className="flex items-center gap-3">
            <GiCheckMark className="text-yellow-400" />{" "}
            <span>Average revenue per seller: $567</span>
          </li>
          <li className="flex items-center gap-3">
            <GiCheckMark className="text-yellow-400" />{" "}
            <span>New users this week: 150</span>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
