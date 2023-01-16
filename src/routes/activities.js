// In this file I will create routes for pulling out the activities for a specific customer
const express = require("express");
const router = express();
const auth = require("../middleware/auth");
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.NAPLO_URI);
const timelogsCollection = client.db("naplo").collection("timelogs");

router.get("/62aae362b24af1027d49c557", async (req, res) => {
  try {
    await client.connect();
    console.log("Just connected to MongoDB Atlas!");
    // list out all the databases in the cluster
    let result = await timelogsCollection.find({ activityType: "Freelance Paid Job", customer: "Nigel" }).toArray();
    let docCount = await timelogsCollection.countDocuments({ activityType: "Freelance Paid Job", customer: "Nigel" });
    //await result.forEach((doc) => console.log(doc));
    res.json(result);
    console.log("found " + docCount);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
    await console.log("connection closed");
  }
});

const main = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas!");
    // list out all the databases in the cluster
    const dbs = await client.db().admin().listDatabases();
    console.table(dbs.databases);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

// main()
//   .catch((err) => console.log(err))
//   .finally(() => {
//     console.log("connection closed");
//     client.close();
//   });

module.exports = router;
