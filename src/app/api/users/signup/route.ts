import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/models/useModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { first_name, last_name, email, password } = reqBody;

    checkValidProps(first_name, last_name, email, password);

    const userExist = await User.findOne({ email });

    if (userExist) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 405 }
      );
    }

    //hash the password

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword,
    });

    const saveUser = await newUser.save();

    console.log(saveUser);

    return NextResponse.json({
      message: "User Created Successfully",
      success: true,
      saveUser,
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }
}

function checkValidProps(
  first_name: string,
  last_name: string,
  email: string,
  password: string
) {
  if (
    first_name.length > 0 &&
    last_name.length > 0 &&
    email.length > 0 &&
    password.length > 0
  ) {
  } else {
    NextResponse.json({ error: " Empty Fields" }, { status: 250 });
  }
}
