import mongoose from "mongoose";

const cardUrlRegex =  /^https?:\/\/(www\.)?[\w-]+(\.[a-z]{2,})+(\/[\]a-z\d._~:/?%#[@!$&'()*+,;=-]*)?$/i;

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  link: { type: String, required: true, validate: { validator: (v: string) => cardUrlRegex.test(v), message: "Invalid URL format" } },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  likes: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User",},],default: [],},
  createdAt: { type: Date, default: Date.now },
});

const Card = mongoose.model("Card", cardSchema);

export default Card;