const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const router = express.Router();

const configuration = new Configuration({
  organization: "org-o1IeaNwAfBiyvvSt6psUFsvz",
  apiKey: process.env.CHATGPT_API,
});
const openai = new OpenAIApi(configuration);

router.post("/", async (req, res) => {
  const { chats } = req.body;

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
  // Create the chat session ID
  const sessionId = new Date();
  console.log("sessionId: ", sessionId);

  // Save the conversation to your database
  // console.log("save conversation: ", chats);

  res.json({
    output: result.data.choices[0].message,
  });
});

// Create route for saving conversations.
// router.post("/chat", (req, res) => {
//   const { sessionId, messages } = req.body;

//   // Save chat messages to database - This should be changed as per the last recent ChatGPT instructions (continue from here, see instructions below!)
//   const chat = new Chat({
//     sessionId,
//     messages,
//   });
//   chat
//     .save()
//     .then(() => {
//       res.status(200).send("Chat saved successfully.");
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send("Error saving chat to database.");
//     });
// });

module.exports = router;
