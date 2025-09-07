"use client";

import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";

export default function AddProduct() {
  const { register, control, handleSubmit, reset } = useForm({
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

  const onSubmit = async (data) => {
    try {
      // convert numbers before sending
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
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Basic Info */}
        <input {...register("title")} placeholder="Title" className="input input-bordered w-full" />
        <textarea {...register("description")} placeholder="Description" className="textarea textarea-bordered w-full" />
        <input {...register("category")} placeholder="Category" className="input input-bordered w-full" />
        <input {...register("brand")} placeholder="Brand" className="input input-bordered w-full" />
        <input type="number" {...register("price")} placeholder="Price" className="input input-bordered w-full" />
        <input type="number" {...register("discountPrice")} placeholder="Discount Price" className="input input-bordered w-full" />
        <input {...register("thumbnail")} placeholder="Thumbnail URL" className="input input-bordered w-full" />
        <input {...register("gender")} placeholder="Gender" className="input input-bordered w-full" />

        {/* Sizes */}
        <div>
          <h3 className="font-semibold">Sizes</h3>
          {sizeFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 my-1">
              <input {...register(`sizes.${index}`)} placeholder="Size" className="input input-bordered" />
              <button type="button" onClick={() => removeSize(index)} className="btn btn-error btn-sm">X</button>
            </div>
          ))}
          <button type="button" onClick={() => appendSize("")} className="btn btn-outline btn-sm">+ Add Size</button>
        </div>

        {/* Images */}
        <div>
          <h3 className="font-semibold">Images</h3>
          {imageFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 my-1">
              <input {...register(`images.${index}`)} placeholder="Image URL" className="input input-bordered w-full" />
              <button type="button" onClick={() => removeImage(index)} className="btn btn-error btn-sm">X</button>
            </div>
          ))}
          <button type="button" onClick={() => appendImage("")} className="btn btn-outline btn-sm">+ Add Image</button>
        </div>

        {/* Variants */}
        <div>
          <h3 className="font-semibold">Variants</h3>
          {variantFields.map((field, index) => (
            <div key={field.id} className="border p-3 rounded-xl mb-3">
              <input {...register(`variants.${index}.color`)} placeholder="Color" className="input input-bordered w-full mb-2" />
              <input {...register(`variants.${index}.image`)} placeholder="Variant Image URL" className="input input-bordered w-full mb-2" />

              {/* Sizes inside variant */}
              <h4 className="font-medium">Sizes</h4>
              <VariantSizes control={control} register={register} variantIndex={index} />

              <button type="button" onClick={() => removeVariant(index)} className="btn btn-error btn-sm mt-2">Remove Variant</button>
            </div>
          ))}
          <button type="button" onClick={() => appendVariant({ color: "", sizes: [{ size: "", stock: 0 }], image: "" })} className="btn btn-outline btn-sm">
            + Add Variant
          </button>
        </div>

        {/* Specifications */}
        <div>
          <h3 className="font-semibold">Specifications</h3>
          <input {...register("specifications.closure")} placeholder="Closure" className="input input-bordered w-full" />
          <input {...register("specifications.sole")} placeholder="Sole" className="input input-bordered w-full" />
          <input {...register("specifications.width")} placeholder="Width" className="input input-bordered w-full" />
          <input {...register("specifications.outerMaterial")} placeholder="Outer Material" className="input input-bordered w-full" />
          <input {...register("specifications.materialCare")} placeholder="Material Care" className="input input-bordered w-full" />
        </div>

        {/* Rating */}
        {/* <div>
          <h3 className="font-semibold">Rating</h3>
          <input type="number" {...register("rating.average")} placeholder="Average Rating" className="input input-bordered w-full" />
          <input type="number" {...register("rating.count")} placeholder="Rating Count" className="input input-bordered w-full" />
        </div> */}

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">Submit Product</button>
      </form>
    </div>
  );
}

// VariantSizes Component
function VariantSizes({ control, register, variantIndex }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variants.${variantIndex}.sizes`,
  });

  return (
    <div>
      {fields.map((field, idx) => (
        <div key={field.id} className="flex gap-2 my-1">
          <input {...register(`variants.${variantIndex}.sizes.${idx}.size`)} placeholder="Size" className="input input-bordered" />
          <input type="number" {...register(`variants.${variantIndex}.sizes.${idx}.stock`)} placeholder="Stock" className="input input-bordered w-24" />
          <button type="button" onClick={() => remove(idx)} className="btn btn-error btn-sm">X</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ size: "", stock: 0 })} className="btn btn-outline btn-sm">+ Add Size</button>
    </div>
  );
}
