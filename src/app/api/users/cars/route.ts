import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getDataFromToken, getUIDDataFromToken } from "@/helpers/getTokenData";

export async function GET(request: NextRequest) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    const userId = await getUIDDataFromToken(request);

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    const cars = await prisma.car.findMany({
      where: {
        userId: userId,
        OR: search
          ? [
              { title: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
              { tags: { has: search } },
            ]
          : undefined,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(cars);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  console.log(
    "----------------------------------------------------------------"
  );
  console.log("Inside here");
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    const userId = await getUIDDataFromToken(request);
    console.log("The UID is: ", userId);

    const body = await request.json();
    console.log("First passed");
    // Validate images array length
    if (body.images.length > 10) {
      return NextResponse.json(
        { error: "Maximum 10 images allowed" },
        { status: 400 }
      );
    }
    console.log("second passed");

    console.log("Creating ....");
    const car = await prisma.car.create({
      data: {
        ...body,
        userId: userId,
      },
    });
    console.log("Creation Done...");

    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
