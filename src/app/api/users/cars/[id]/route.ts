import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUIDDataFromToken } from "@/helpers/getTokenData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUIDDataFromToken(request);

    // const car = await prisma.car.findUnique({
    //   where: {
    //     id: params.id,
    //     userId: userId,
    //   },
    // });
    const car = await prisma.car.findFirst({
      where: {
        id: params.id,
        userId: userId,
      },
    });

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUIDDataFromToken(request);

    const body = await request.json();

    // Validate images array length
    if (body.images?.length > 10) {
      return NextResponse.json(
        { error: "Maximum 10 images allowed" },
        { status: 400 }
      );
    }

    // const car = await prisma.car.update({
    //   where: {
    //     id: params.id,
    //     userId: userId,
    //   },
    //   data: body,
    // });
    const car = await prisma.car.findFirst({
      where: {
        id: params.id,
        userId: userId,
      },
    });

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Update the car
    const updatedCar = await prisma.car.updateMany({
      where: {
        id: params.id,
        userId: userId,
      },
      data: body,
    });

    return NextResponse.json(updatedCar);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUIDDataFromToken(request);

    await prisma.car.delete({
      where: {
        id: params.id,
        userId: userId,
      },
    });

    return NextResponse.json({ message: "Car deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
