import mongoose from "mongoose";

const avatarUrlRegex = /^https?:\/\/(www\.)?[\w-]+(\.[\w-]+)+(\/[^\s]*)?$/i;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Jacques Cousteau",
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Explorador",
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: "https://practicum-content.s3.us-west-1.amazonaws.com/web-lat/avatar.jpg",
    required: true,
    validate: {
      validator: (v: string) => avatarUrlRegex.test(v),
      message: "Invalid URL format",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;