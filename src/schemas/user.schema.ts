import mongoose, { Model, Mongoose, Schema } from "mongoose";
import { UserModel } from "../types/interfaces/users.interface";


const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Users = mongoose.model<UserModel & Document>("User", UserSchema);
export default Users;
