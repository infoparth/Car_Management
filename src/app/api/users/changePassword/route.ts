import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/useModel";
import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma";

// connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, newpassword } = reqBody;
    console.log(token);

    // const user = await User.findOne({
    //   forgotPasswordToken: token,
    //   forgotPasswordTokenExpiry: { $gt: Date.now() },
    // });

    const user = await prisma.user.findFirst({
      where: {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 404 });
    }

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(newpassword, salt);

    user.password = hashedPassword;
    user.forgotPasswordTokenExpiry = undefined;
    user.forgotPasswordToken = undefined;

    await user.save();

    return NextResponse.json({
      message: "Email Verified successfully",
      success: true,
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
