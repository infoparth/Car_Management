import { getDataFromToken } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/useModel";
import { connect } from "@/app/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userEmail = await getDataFromToken(request);

    const details = await User.findOne({ email: userEmail }).select(
      "-password"
    );
    console.log("User details: ", details);

    return NextResponse.json({
      message: "User Fetched Successfully",
      data: details,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 405 });
  }
}
