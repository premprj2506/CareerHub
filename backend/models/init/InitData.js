// npm mongoose require
const mongoose = require("mongoose");
// require generated random data
const JobData = require("./JobData.js");
// require schema
const JobListing = require("../JobListing.js");

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/careerhub");
}

const initDB = async () => {
  //   await JobListing.deleteMany({});
  //   JobData = JobData.map((obj) => ({
  //     ...obj,
  //     owner: "657d941eb1c5afafb01f0171",
  //   }));
  await JobListing.insertMany(JobData);
  console.log("data was intialized");
};

initDB();
