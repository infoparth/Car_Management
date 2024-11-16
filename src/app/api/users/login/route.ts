import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/models/useModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

// connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log("The req body is", reqBody);

    // check if user exists

    // const user = await User.findOne({ email });

    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log("The user is", user);

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 400,
        }
      );
    }

    //check if password is correct

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    //create the token data

    const tokenData = {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.firstName,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "User Logegd in successfully",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
