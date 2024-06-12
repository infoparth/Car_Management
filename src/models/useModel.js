import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please provide your first name"],
    trim: true,
  },
  last_name: {
    type: String,
    required: [true, "Please provide your Last name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your Password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
