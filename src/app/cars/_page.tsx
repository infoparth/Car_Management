"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

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

export default function CarsListPage() {
  const [cars, setCars] = useState<Car[]>();
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      const data = await api.getCars(search);
      setCars(data);
    };
    fetchCars();
  }, [search]);

  return (
    <div>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search cars..."
        />
      </div>
      <div>
        {cars && cars.map((car: any) => (
          <div key={car.id} onClick={() => router.push(`/cars/${car.id}`)}>
            <h3>{car.title}</h3>
            <p>{car.description}</p>
            <div>{car.tags.join(", ")}</div>
            {car.images[0] && <img src={car.images[0]} alt={car.title} />}
          </div>
        ))}
      </div>
    </div>
  );
}
