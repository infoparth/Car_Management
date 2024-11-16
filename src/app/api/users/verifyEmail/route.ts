import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/useModel";
import prisma from "@/lib/prisma";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    // const user = await User.findOne({
    //   verifyToken: token,
    //   verifyTokenExpiry: { $gt: Date.now() },
    // });
    const user = await prisma.user.findFirst({
      where: {
        verifyToken: token,
        verifyTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 404 });
    }

    // user.isVerified = true;
    // user.verifyTokenExpiry = undefined;
    // user.verifyToken = undefined;

    // await user.save();
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verifyToken: null,
        verifyTokenExpiry: null,
      },
    });

    return NextResponse.json({
      message: "Email Verified successfully",
      succes: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "error.message",
      },
      {
        status: 500,
      }
    );
  }
}
