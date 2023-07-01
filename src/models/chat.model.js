const mongoose = require("mongoose");
const chatMessageSchema = new mongoose.Schema(
  {
    session_id: { type: String, required: true },
    user_id: { type: String },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

module.exports = ChatMessage;
