const mongoose = require("mongoose");
const conversationSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },
    chats: [
      {
        role: String,
        content: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
