import mongoose from "mongoose";

const avatarUrlRegex =  /^https?:\/\/(www\.)?[\w-]+(\.[a-z]{2,})+(\/[\]a-z\d._~:/?%#[@!$&'()*+,;=-]*)?$/i;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  about: { type: String, required: true, minlength: 2, maxlength: 30 },
  avatar: { type: String, required: true, validate: { validator: (v: string) => avatarUrlRegex.test(v), message: "Invalid URL format" } },
});

const User = mongoose.model("User", userSchema);

export default User;