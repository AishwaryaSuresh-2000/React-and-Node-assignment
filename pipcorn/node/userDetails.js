import { Schema, model } from "mongoose";

const UserDetailsScehma = new Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
    userType: String,
  },
  {
    collection: "UserInfo",
  }
);

model("UserInfo", UserDetailsScehma);
export default UserDetailsScehma