"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import cyber from "@/assets/ford5.png";

export default function Custom404() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center relative">
      <Image
        src={cyber}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
      <div className="relative z-10 p-6 bg-black bg-opacity-50 rounded-lg">
        <h1 className="text-5xl font-bold text-white mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-gray-300 mb-6">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link href="/">Go back to Home</Link>
      </div>
    </div>
  );
}
