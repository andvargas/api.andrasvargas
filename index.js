const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 5001;
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const portfolioRouter = require("./src/routes/projects");
const usersRouter = require("./src/routes/users");
const enquiryRouter = require("./src/routes/enquiries");
const contentRouter = require("./src/routes/content");

app.use("/portfolio-items", portfolioRouter);
app.use("/users", usersRouter);
app.use("/enquiries", enquiryRouter);
app.use("/content", contentRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
