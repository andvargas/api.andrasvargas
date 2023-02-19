const router = require("express").Router();
let Enquiry = require("../models/enquiries.model");
const authAdmin = require("../middleware/authAdmin");
const nodemailer = require("nodemailer");

// Create email when a new enquiry is posted
let transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false,
  auth: {
    user: "apikey",
    pass: process.env.S_API_KEY,
  },
});

const sendEmail = (enquiry) => {
  let mailOptions = {
    from: "Sendgrid Admin <a.vargyas@colyer.co.uk>",
    replyTo: enquiry.email,
    to: "a.vargyas@gmail.com",
    subject: "You've got a new enquiry through AndrasVargas.com from " + enquiry.name,
    text: enquiry.notes,
  };
  console.log("Email is being sent...");
  transporter.sendMail(mailOptions, function (err, success) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email has been sent");
    }
  });
};

router.post("/add", async (req, res) => {
  const enquiry = new Enquiry(req.body);
  try {
    await enquiry.save();
    res.status(201).send(enquiry);
    sendEmail(enquiry);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/all", authAdmin, async (req, res) => {
  try {
    const enquiries = await Enquiry.find({});
    res.status(200).send(enquiries);
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
