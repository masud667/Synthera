"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "./Sidebar";
import axios from "axios";
import WishlistItems from "./user/WishlistItems";

const AllCart = dynamic(() => import("./user/AllCart"), { ssr: false });
const OrderedItems = dynamic(() => import("./user/OrderedItems"), {
  ssr: false,
});
const PendingDelivery = dynamic(() => import("./user/PendingDelivery"), {
  ssr: false,
});

const AddProduct = dynamic(() => import("./seller/AddProduct"), { ssr: false });
const AllProducts = dynamic(() => import("./seller/AllProducts"), {
  ssr: false,
});
const TotalSell = dynamic(() => import("./seller/TotalSell"), { ssr: false });
const SellerProfile = dynamic(() => import("./seller/SellerProfile"), {
  ssr: false,
});

const UserProfile = dynamic(() => import("./user/UserProfile"), { ssr: false });

const AdminProfile = dynamic(() => import("./admin/AdminProfile"), {
  ssr: false,
});
const SellerRequest = dynamic(() => import("./admin/SellerRequest"), {
  ssr: false,
});
const TotalSellers = dynamic(() => import("./admin/TotalSellers"), {
  ssr: false,
});
const TotalUsers = dynamic(() => import("./admin/TotalUsers"), { ssr: false });

export default function DashboardLayout() {
  const [activeRoute, setActiveRoute] = useState("profile");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const role = user?.role;

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

  const renderContent = () => {
    if (role === "admin") {
      switch (activeRoute) {
        case "profile":
          return <AdminProfile />;
        case "seller-request":
          return <SellerRequest />;
        case "total-sellers":
          return <TotalSellers />;
        case "total-users":
          return <TotalUsers />;
        default:
          return <AdminProfile />;
      }
    } else if (role === "seller") {
      switch (activeRoute) {
        case "profile":
          return <SellerProfile />;
        case "add-product":
          return <AddProduct />;
        case "all-product":
          return <AllProducts />;
        case "total-sell":
          return <TotalSell />;
        default:
          return <SellerProfile />;
      }
    } else {
      switch (activeRoute) {
        case "profile":
          return <UserProfile />;
        case "all-cart":
          return <AllCart />;
        case "wishlist":
          return <WishlistItems/>;
        case "ordered-item":
          return <OrderedItems />;
        case "pending-delivery":
          return <PendingDelivery />;
        default:
          return <UserProfile />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 pt-5 lg:pt-0">
      <div className="container mx-auto px-4 flex p-8">
        <Sidebar
          role={role}
          activeRoute={activeRoute}
          setActiveRoute={setActiveRoute}
        />
        <div className="flex flex-col flex-1 md:pl-4 lg:pl-8">
          <main className="lg:p-6 bg-white rounded-2xl text-black">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
