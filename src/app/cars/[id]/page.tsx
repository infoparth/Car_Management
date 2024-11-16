"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { CarForm } from "@/components/CarFrom";

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const [car, setCar] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCar = async () => {
      const data = await api.getCar(params.id);
      setCar(data);
    };
    fetchCar();
  }, [params.id]);

  const handleUpdate = async (data: any) => {
    await api.updateCar(params.id, data);
    setCar(data);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this car?")) {
      await api.deleteCar(params.id);
      router.push("/cars");
    }
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div>
      {isEditing ? (
        <CarForm initialData={car} onSubmit={handleUpdate} />
      ) : (
        <div>
          <h1>{car.title}</h1>
          <p>{car.description}</p>
          <div>{car.tags.join(", ")}</div>
          <div>
            {car.images.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`${car.title} - ${index + 1}`}
              />
            ))}
          </div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
