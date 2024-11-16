"use client";
import { useRouter } from "next/navigation";
import { CarForm } from "@/components/CarFrom";
import { api } from "@/lib/api";
import axios from "axios";

export default function NewCarPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    // await api.createCar(data);
    const response = await axios.post("/api/users/cars", data);
    router.push("/cars");
  };

  return (
    <div>
      <h1>Add New Car</h1>
      <CarForm onSubmit={handleSubmit} />
    </div>
  );
}
