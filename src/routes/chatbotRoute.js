const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const router = express.Router();

const configuration = new Configuration({
  organization: "org-o1IeaNwAfBiyvvSt6psUFsvz",
  apiKey: "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",
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
  console.log("result: ", result);
  res.json({
    output: result.data.choices[0].message,
  });
});

module.exports = router;
