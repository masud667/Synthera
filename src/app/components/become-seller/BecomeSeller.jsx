"use client";

import { useState, useEffect } from "react";
import { MapPin, Upload } from "lucide-react";
import { useSession } from "next-auth/react";

export default function BecomeSeller() {
  const { data: session, status } = useSession();

  const [profilePic, setProfilePic] = useState(null);
  const [shopLogo, setShopLogo] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    shopName: "",
    shopWebsite: "",
    productCategories: [],
    monthlySales: "",
    shopDesc: "",
    acceptTerms: false,
  });

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty & Health",
    "Sports",
    "Toys & Games",
    "Books",
    "Automotive",
    "Groceries",
    "Jewelry",
    "Pets",
    "Garden",
  ];

  // Pre-fill form when session loads
  useEffect(() => {
    if (session?.user) {
      const [firstName, ...rest] = session.user.name?.split(" ") || [];
      const lastName = rest.join(" ");
      setFormData((prev) => ({
        ...prev,
        firstName: firstName || "",
        lastName: lastName || "",
        email: session.user.email || "",
      }));
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryChange = (cat) => {
    setFormData((prev) => {
      const newCats = prev.productCategories.includes(cat)
        ? prev.productCategories.filter((c) => c !== cat)
        : [...prev.productCategories, cat];
      return { ...prev, productCategories: newCats };
    });
  };

  const handleLocation = async () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await res.json();
      setFormData((prev) => ({ ...prev, address: data.display_name }));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, profilePic, shopLogo, coverPhoto });
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="max-w-5xl mx-auto p-12">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="font-semibold p-3 rounded-3xl bg-[#EEF2FF] text-[#7051E6]">
          Application Form
        </span>
        <h1 className="text-3xl font-bold text-blue-500 mt-4">
          Join as a Seller
        </h1>
        <p className="text-gray-600">
          Complete your seller application below. Our team reviews all
          applications within 24 hours.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 space-y-10"
      >
        {/* Personal Info */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-sm">
              1
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700">
              Personal Info
            </h2>
          </div>

          {/* Profile Pic */}
          <div className="flex flex-col items-center space-y-2">
            <div className="relative w-28 h-28">
              <div className="absolute inset-0 rounded-full border-4 border-gray-300 flex items-center justify-center">
                <label className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden relative">
                  {profilePic ? (
                    <img
                      src={URL.createObjectURL(profilePic)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload size={32} className="text-gray-400" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePic(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="border p-2 rounded-md w-full"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="border p-2 rounded-md w-full"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="border p-2 text-black rounded-md w-full bg-gray-100 cursor-not-allowed"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border p-2 rounded-md w-full"
              required
            />
          </div>
        </section>

        {/* Business Info */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-sm">
              2
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700">
              Business Info
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Business Name"
              className="border p-2 rounded-md w-full"
              required
            />
            <input
              type="text"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              placeholder="Business Type"
              className="border p-2 rounded-md w-full"
              required
            />
            <div className="relative w-full">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Business Address"
                className="border p-2 rounded-md w-full pr-10"
                required
              />
              <button
                type="button"
                onClick={handleLocation}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500"
              >
                <MapPin size={20} />
              </button>
            </div>

            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="Zip Code"
              className="border p-2 rounded-md w-full"
              required
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="border p-2 rounded-md w-full"
              required
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="border p-2 rounded-md w-full"
              required
            />
          </div>
        </section>

        {/* Shop Info */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-sm">
              3
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700">
              Shop Info
            </h2>
          </div>

          {/* Cover & Logo */}
          <div className="relative">
            {/* Cover */}
            <div className="w-full h-40 bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverPhoto(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {coverPhoto ? (
                <img
                  src={URL.createObjectURL(coverPhoto)}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <Upload size={28} />
                  <span>Upload Cover Photo</span>
                </div>
              )}
            </div>

            {/* Logo */}
            <div className="absolute left-6 -bottom-12">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setShopLogo(e.target.files[0])}
                  className="absolute w-24 h-24 opacity-0 cursor-pointer rounded-full z-10"
                />
                <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden border-4 border-white shadow-md flex items-center justify-center relative">
                  {shopLogo ? (
                    <img
                      src={URL.createObjectURL(shopLogo)}
                      alt="Shop Logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-gray-400">
                      <Upload size={20} />
                      <span className="text-xs">Upload Logo</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              placeholder="Shop Name"
              className="border p-2 rounded-md w-full"
              required
            />
            <input
              type="text"
              name="shopWebsite"
              value={formData.shopWebsite}
              onChange={handleChange}
              placeholder="Shop Website (optional)"
              className="border p-2 rounded-md w-full"
            />
            <div className="col-span-2">
              <p className="mb-2 text-gray-600 font-medium">
                Product Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3 py-1 rounded-full border ${
                      formData.productCategories.includes(cat)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="number"
              name="monthlySales"
              value={formData.monthlySales}
              onChange={handleChange}
              placeholder="Expected Monthly Sales Volume"
              className="border p-2 rounded-md w-full"
              required
            />
            <textarea
              name="shopDesc"
              value={formData.shopDesc}
              onChange={handleChange}
              placeholder="Describe your shop"
              className="border p-2 rounded-md w-full col-span-2"
              rows={4}
              required
            />
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              required
            />
            <span>I accept all terms and conditions</span>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md mt-4 w-full"
          >
            Submit Application
          </button>
        </section>
      </form>
    </div>
  );
}
