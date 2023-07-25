const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const Conversation = require("./../models/chat.model");

const router = express.Router();

const configuration = new Configuration({
  organization: "org-o1IeaNwAfBiyvvSt6psUFsvz",
  apiKey: process.env.CHATGPT_API,
});
const openai = new OpenAIApi(configuration);

router.post("/", async (req, res) => {
  const { sessionId, chats } = req.body;

  // Fetch the latest conversation from the database (if any)
  let latestConversation;
  try {
    latestConversation = await Conversation.findOne({ sessionId }).sort({ createdAt: -1 });
  } catch (err) {
    console.error("Error fetching latest conversation from the database:", err);
    latestConversation = null;
  }

  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are AndreGPT. You can help with website development related issues",
      },
      ...chats,
    ],
  });

  // Extract the assistant's reply from the OpenAI API response
  const assistantReply = result.data.choices[0].message;

  // If a conversation exists for the session, update it with the new messages
  if (latestConversation) {
    latestConversation.chats = [...chats, assistantReply];
  } else {
    // If no conversation exists for the session, create a new one and save it
    latestConversation = new Conversation({ sessionId, chats });
  }

  try {
    await latestConversation.save();
  } catch (err) {
    console.error("Error updating conversation in the database:", err);
  }

  res.json({
    output: assistantReply,
  });
});

module.exports = router;
