import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const encodedToken = request.cookies.get("token")?.value || "";

    console.log("Encoded token new", encodedToken);

    const decodedToken: any = jwt.verify(
      encodedToken,
      process.env.TOKEN_SECRET!
    );

    console.log("Decoded token", decodedToken);

    return decodedToken.email;
  } catch (error: any) {
    throw new Error("New Error in getTokenData", error.message);
  }
};

export const getUIDDataFromToken = (request: NextRequest) => {
  try {
    const encodedToken = request.cookies.get("token")?.value || "";

    console.log("Encoded token", encodedToken);

    const decodedToken: any = jwt.verify(
      encodedToken,
      process.env.TOKEN_SECRET!
    );

    // console.log("Decoded token", decodedToken);

    return decodedToken.id;
  } catch (error: any) {
    throw new Error("New Error in getTokenData", error.message);
  }
};
