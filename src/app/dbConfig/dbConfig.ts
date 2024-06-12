import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGOOSE_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connection established");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error", err);
      process.exit(1);
    });
  } catch (error) {
    console.log("Error!!");
    console.log(error);
  }
}
