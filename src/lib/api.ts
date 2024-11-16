// export const api = {
//   getCars: async (search?: string) => {
//     const response = await fetch(
//       `/api/cars${search ? `?search=${search}` : ""}`
//     );
//     if (!response.ok) throw new Error("Failed to fetch cars");
//     return response.json();
//   },

//   getCar: async (id: string) => {
//     const response = await fetch(`/api/cars/${id}`);
//     if (!response.ok) throw new Error("Failed to fetch car");
//     return response.json();
//   },

//   createCar: async (data: any) => {
//     const response = await fetch("/api/cars", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) throw new Error("Failed to create car");
//     return response.json();
//   },

//   updateCar: async (id: string, data: any) => {
//     const response = await fetch(`/api/cars/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) throw new Error("Failed to update car");
//     return response.json();
//   },

//   deleteCar: async (id: string) => {
//     const response = await fetch(`/api/cars/${id}`, {
//       method: "DELETE",
//     });
//     if (!response.ok) throw new Error("Failed to delete car");
//     return response.json();
//   },
// };

import axios from "axios";

// Define types for better type safety
interface Car {
  id: string;
  title: string;
  description: string;
  images: string[];
  carType: string;
  company: string;
  dealer: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

// Create axios instance with common config
const axiosInstance = axios.create({
  baseURL: "/api/users",
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  getCars: async (search?: string) => {
    try {
      const { data } = await axiosInstance.get<Car[]>(
        `/cars${search ? `?search=${search}` : ""}`
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || "Failed to fetch cars");
      }
      throw error;
    }
  },

  getCar: async (id: string) => {
    try {
      const { data } = await axiosInstance.get<Car>(`/cars/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || "Failed to fetch car");
      }
      throw error;
    }
  },

  createCar: async (
    carData: Omit<Car, "id" | "createdAt" | "updatedAt" | "userId">
  ) => {
    try {
      const { data } = await axiosInstance.post<Car>("/cars", carData);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || "Failed to create car");
      }
      throw error;
    }
  },

  updateCar: async (
    id: string,
    carData: Partial<Omit<Car, "id" | "createdAt" | "updatedAt" | "userId">>
  ) => {
    try {
      const { data } = await axiosInstance.put<Car>(`/cars/${id}`, carData);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || "Failed to update car");
      }
      throw error;
    }
  },

  deleteCar: async (id: string) => {
    try {
      const { data } = await axiosInstance.delete(`/cars/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || "Failed to delete car");
      }
      throw error;
    }
  },
};
