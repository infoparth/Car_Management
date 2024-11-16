import { connect } from "@/app/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/useModel";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// connect();

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const { email } = res;
    console.log(email);
    // const user = await User.findOne({ email });

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not Found" }, { status: 404 });
    } else {
      const userId = user._id;
      await sendEmail({ email, emailType: "RESET", userId: userId });
    }

    return NextResponse.json({
      message: "User Fetched Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to Generate token" },
      { status: 201 }
    );
  }
}
