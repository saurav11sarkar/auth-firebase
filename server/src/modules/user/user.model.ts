import mongoose from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcryptjs";
import config from "../../config";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: [true, "Name is requried"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    photoURL: { type: String },
    ways: {
      type: String,
      enum: ["catential", "google", "github"],
      default: "catential",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, Number(config.round));
  }
  next();
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
