"use client";

import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";

export default function AddProduct() {
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      brand: "",
      price: "",
      discountPrice: "",
      thumbnail: "",
      sizes: [""],
      images: [""],
      variants: [
        {
          color: "",
          sizes: [{ size: "", stock: "" }],
          image: "",
        },
      ],
      specifications: {
        closure: "",
        sole: "",
        width: "",
        outerMaterial: "",
        materialCare: "",
      },
      rating: {
        average: "",
        count: "",
      },
      gender: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({ control, name: "sizes" });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({ control, name: "images" });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({ control, name: "variants" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const payload = {
        ...data,
        price: Number(data.price),
        discountPrice: Number(data.discountPrice),
        rating: {
          average: Number(data.rating.average),
          count: Number(data.rating.count),
        },
        variants: data.variants.map((v) => ({
          ...v,
          sizes: v.sizes.map((s) => ({
            size: s.size,
            stock: Number(s.stock),
          })),
        })),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const res = await axios.post("/api/products", payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Product created:", res.data);
      reset();
    } catch (err) {
      console.error("❌ Failed to create product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#1c4c8b] to-[#1c4c8b] text-white rounded-lg shadow-lg p-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold">Add New Product</h1>
        <p className="mt-2 text-lg opacity-90">Create a new product listing for your store.</p>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="border-b pb-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  {...register("title", { required: "Title is required" })}
                  id="title"
                  placeholder="Enter product title"
                  className={`w-full px-4 py-2 border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  aria-label="Product title"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  {...register("category", { required: "Category is required" })}
                  id="category"
                  placeholder="Enter category"
                  className={`w-full px-4 py-2 border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  aria-label="Product category"
                />
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
              </div>
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <input
                  {...register("brand")}
                  id="brand"
                  placeholder="Enter brand"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Product brand"
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <input
                  {...register("gender")}
                  id="gender"
                  placeholder="Enter gender"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Product gender"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  {...register("price", { required: "Price is required", min: 0 })}
                  id="price"
                  placeholder="Enter price"
                  className={`w-full px-4 py-2 border ${errors.price ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  aria-label="Product price"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
              </div>
              <div>
                <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Price
                </label>
                <input
                  type="number"
                  {...register("discountPrice", { min: 0 })}
                  id="discountPrice"
                  placeholder="Enter discount price"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Product discount price"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail URL
                </label>
                <input
                  {...register("thumbnail", { required: "Thumbnail URL is required" })}
                  id="thumbnail"
                  placeholder="Enter thumbnail URL"
                  className={`w-full px-4 py-2 border ${errors.thumbnail ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  aria-label="Product thumbnail URL"
                />
                {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  id="description"
                  placeholder="Enter product description"
                  className={`w-full px-4 py-2 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  rows="4"
                  aria-label="Product description"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="border-b pb-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Sizes</h3>
            {sizeFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4 mb-2">
                <input
                  {...register(`sizes.${index}`, { required: "Size is required" })}
                  placeholder="Enter size (e.g., S, M, L)"
                  className={`flex-grow px-4 py-2 border ${errors.sizes?.[index] ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  aria-label={`Size ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  aria-label={`Remove size ${index + 1}`}
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendSize("")}
              className="mt-2 px-4 py-2 bg-[#1c4c8b] text-white rounded-md hover:bg-blue-700 transition"
            >
              + Add Size
            </button>
          </div>

          {/* Images */}
          <div className="border-b pb-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Images</h3>
            {imageFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4 mb-2">
                <input
                  {...register(`images.${index}`, { required: "Image URL is required" })}
                  placeholder="Enter image URL"
                  className={`flex-grow px-4 py-2 border ${errors.images?.[index] ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  aria-label={`Image ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  aria-label={`Remove image ${index + 1}`}
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendImage("")}
              className="mt-2 px-4 py-2 bg-[#1c4c8b] text-white rounded-md hover:bg-blue-700 transition"
            >
              + Add Image
            </button>
          </div>

          {/* Variants */}
          <div className="border-b pb-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Variants</h3>
            {variantFields.map((field, index) => (
              <div key={field.id} className="border p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`variants.${index}.color`} className="block text-sm font-medium text-gray-700 mb-1">
                      Color
                    </label>
                    <input
                      {...register(`variants.${index}.color`, { required: "Color is required" })}
                      id={`variants.${index}.color`}
                      placeholder="Enter color"
                      className={`w-full px-4 py-2 border ${errors.variants?.[index]?.color ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      aria-label={`Variant ${index + 1} color`}
                    />
                    {errors.variants?.[index]?.color && (
                      <p className="text-red-500 text-sm mt-1">{errors.variants[index].color.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor={`variants.${index}.image`} className="block text-sm font-medium text-gray-700 mb-1">
                      Variant Image URL
                    </label>
                    <input
                      {...register(`variants.${index}.image`, { required: "Variant image URL is required" })}
                      id={`variants.${index}.image`}
                      placeholder="Enter variant image URL"
                      className={`w-full px-4 py-2 border ${errors.variants?.[index]?.image ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      aria-label={`Variant ${index + 1} image URL`}
                    />
                    {errors.variants?.[index]?.image && (
                      <p className="text-red-500 text-sm mt-1">{errors.variants[index].image.message}</p>
                    )}
                  </div>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">Sizes</h4>
                <VariantSizes control={control} register={register} variantIndex={index} errors={errors} />
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="mt-4 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  aria-label={`Remove variant ${index + 1}`}
                >
                  Remove Variant
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendVariant({ color: "", sizes: [{ size: "", stock: 0 }], image: "" })}
              className="mt-2 px-4 py-2 bg-[#1c4c8b] text-white rounded-md hover:bg-blue-700 transition"
            >
              + Add Variant
            </button>
          </div>

          {/* Specifications */}
          <div className="border-b pb-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="specifications.closure" className="block text-sm font-medium text-gray-700 mb-1">
                  Closure
                </label>
                <input
                  {...register("specifications.closure")}
                  id="specifications.closure"
                  placeholder="Enter closure type"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Closure type"
                />
              </div>
              <div>
                <label htmlFor="specifications.sole" className="block text-sm font-medium text-gray-700 mb-1">
                  Sole
                </label>
                <input
                  {...register("specifications.sole")}
                  id="specifications.sole"
                  placeholder="Enter sole type"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Sole type"
                />
              </div>
              <div>
                <label htmlFor="specifications.width" className="block text-sm font-medium text-gray-700 mb-1">
                  Width
                </label>
                <input
                  {...register("specifications.width")}
                  id="specifications.width"
                  placeholder="Enter width"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Width"
                />
              </div>
              <div>
                <label htmlFor="specifications.outerMaterial" className="block text-sm font-medium text-gray-700 mb-1">
                  Outer Material
                </label>
                <input
                  {...register("specifications.outerMaterial")}
                  id="specifications.outerMaterial"
                  placeholder="Enter outer material"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Outer material"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="specifications.materialCare" className="block text-sm font-medium text-gray-700 mb-1">
                  Material Care
                </label>
                <input
                  {...register("specifications.materialCare")}
                  id="specifications.materialCare"
                  placeholder="Enter material care instructions"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Material care instructions"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-[#1c4c8b] text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// VariantSizes Component
function VariantSizes({ control, register, variantIndex, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variants.${variantIndex}.sizes`,
  });

  return (
    <div>
      {fields.map((field, idx) => (
        <div key={field.id} className="flex items-center gap-4 mb-2">
          <div className="flex-grow">
            <input
              {...register(`variants.${variantIndex}.sizes.${idx}.size`, { required: "Size is required" })}
              placeholder="Enter size"
              className={`w-full px-4 py-2 border ${errors.variants?.[variantIndex]?.sizes?.[idx]?.size ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-label={`Variant ${variantIndex + 1} size ${idx + 1}`}
            />
            {errors.variants?.[variantIndex]?.sizes?.[idx]?.size && (
              <p className="text-red-500 text-sm mt-1">{errors.variants[variantIndex].sizes[idx].size.message}</p>
            )}
          </div>
          <div className="w-24">
            <input
              type="number"
              {...register(`variants.${variantIndex}.sizes.${idx}.stock`, { required: "Stock is required", min: 0 })}
              placeholder="Stock"
              className={`w-full px-4 py-2 border ${errors.variants?.[variantIndex]?.sizes?.[idx]?.stock ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-label={`Variant ${variantIndex + 1} stock ${idx + 1}`}
            />
            {errors.variants?.[variantIndex]?.sizes?.[idx]?.stock && (
              <p className="text-red-500 text-sm mt-1">{errors.variants[variantIndex].sizes[idx].stock.message}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => remove(idx)}
            className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            aria-label={`Remove size ${idx + 1} from variant ${variantIndex + 1}`}
          >
            X
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ size: "", stock: 0 })}
        className="mt-2 px-4 py-2 bg-[#1c4c8b] text-white rounded-md hover:bg-blue-700 transition"
      >
        + Add Size
      </button>
    </div>
  );
}