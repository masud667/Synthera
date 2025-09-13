// src/app/become-seller/page.jsx
"use client";

import BecomeSeller from "../components/become-seller/BecomeSeller";
import PrivateRoute from "../components/privateroute/PrivateRoute";



export default function BecomeSellerPage() {
  return (
    <PrivateRoute>
      <BecomeSeller />
    </PrivateRoute>
  );
}