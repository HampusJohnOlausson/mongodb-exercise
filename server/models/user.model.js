import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: String,
  password: {
    type: String,
    select: false
  },
  role: String,
});

const User = mongoose.model("User", userSchema);

export default User;