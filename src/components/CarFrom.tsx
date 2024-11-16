import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Car {
  id?: string;
  title: string;
  description: string;
  images: string[];
  carType: string;
  company: string;
  dealer: string;
  tags: string[];
}

interface CarFormProps {
  initialData?: Car;
  onSubmit: (data: Omit<Car, "id">) => Promise<void>;
}

export function CarForm({ initialData, onSubmit }: CarFormProps) {
  const [formData, setFormData] = useState<Omit<Car, "id">>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    images: initialData?.images || [],
    carType: initialData?.carType || "",
    company: initialData?.company || "",
    dealer: initialData?.dealer || "",
    tags: initialData?.tags || [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "images") {
      const imageArray = value.split(",").map((img) => img.trim());
      if (imageArray.length > 10) {
        setError("Maximum 10 images allowed");
        return;
      }
      setFormData((prev) => ({ ...prev, images: imageArray }));
    } else if (name === "tags") {
      setFormData((prev) => ({
        ...prev,
        tags: value.split(",").map((tag) => tag.trim()),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validation
      if (formData.images.length > 10) {
        throw new Error("Maximum 10 images allowed");
      }

      if (
        !formData.title ||
        !formData.description ||
        !formData.carType ||
        !formData.company ||
        !formData.dealer
      ) {
        throw new Error("Please fill in all required fields");
      }

      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const carTypes = [
    "Sedan",
    "SUV",
    "Hatchback",
    "Coupe",
    "Convertible",
    "Wagon",
    "Van",
    "Truck",
    "Electric",
    "Hybrid",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500 p-2 mb-4">{error}</div>}

      <div>
        <label htmlFor="title" className="block mb-1">
          Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter car title"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="description" className="block mb-1">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter car description"
          required
          className="w-full p-2 border rounded h-32"
        />
      </div>

      <div>
        <label htmlFor="carType" className="block mb-1">
          Car Type *
        </label>
        <select
          id="carType"
          name="carType"
          value={formData.carType}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select car type</option>
          {carTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="company" className="block mb-1">
          Company *
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleInputChange}
          placeholder="Enter car company"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="dealer" className="block mb-1">
          Dealer *
        </label>
        <input
          id="dealer"
          name="dealer"
          type="text"
          value={formData.dealer}
          onChange={handleInputChange}
          placeholder="Enter dealer name"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="images" className="block mb-1">
          Images (Up to 10, comma-separated URLs)
        </label>
        <input
          id="images"
          name="images"
          type="text"
          value={formData.images.join(", ")}
          onChange={handleInputChange}
          placeholder="Enter image URLs separated by commas"
          className="w-full p-2 border rounded"
        />
        <small className="text-gray-500">
          {formData.images.length}/10 images
        </small>
      </div>

      <div>
        <label htmlFor="tags" className="block mb-1">
          Tags (comma-separated)
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          value={formData.tags.join(", ")}
          onChange={handleInputChange}
          placeholder="Enter tags separated by commas"
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isSubmitting
          ? "Submitting..."
          : initialData
          ? "Update Car"
          : "Add Car"}
      </button>
    </form>
  );
}
