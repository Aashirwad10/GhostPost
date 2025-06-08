// models/snippet.js
import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
  content:   { type: String, required: true },
  shortId:   { type: String, required: true, unique: true },
  deleteKey: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAfter: { type: Date, default: Date.now } // DELETES AFTER 24 HOURS
}, {
  collection: "snippets"
});

// ← add this line to create/update the TTL index
// snippetSchema.index({ createdAt: 1 }, { expireAfterSeconds: 20 });

const Snippet = mongoose.model("Snippet", snippetSchema);
export default Snippet;
