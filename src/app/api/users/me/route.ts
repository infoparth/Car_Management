import { getDataFromToken } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/useModel";
import { connect } from "@/app/dbConfig/dbConfig";
import prisma from "@/lib/prisma";

// connect();

export async function GET(request: NextRequest) {
  try {
    const userEmail = await getDataFromToken(request);

    // const details = await User.findOne({ email: userEmail }).select(
    //   "-password"
    // );
    const details = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: false,
        isVerified: true,
      },
    });

    return NextResponse.json({
      message: "User Fetched Successfully",
      data: details,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 405 });
  }
}
