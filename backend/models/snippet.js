import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
  content:   { type: String, required: true },
  shortId:   { type: String, required: true, unique: true },
  deleteKey: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 86400 },
}, {
  collection: "snippets"      // ← forcing this exact collection name due to some error before
});

const Snippet = mongoose.model("Snippet", snippetSchema);
export default Snippet;
