import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: {type: String, required: true}, //La tengo que hashear con bcrypt.
  role: { type: String, default: "user"}
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;