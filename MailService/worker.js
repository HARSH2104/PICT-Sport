const { Worker } = require("bullmq");
const { response } = require("express");
const IORedis = require("ioredis");
const axios = require("axios");

// Create a Redis connection
const connection = new IORedis({
  host: "localhost", // Redis server hostname
  port: 6379, // Redis server port
  // password: 'your-redis-password', // Uncomment if your Redis server requires a password
  maxRetriesPerRequest: null,
});

// Create a Worker with the connection
const worker = new Worker(
  "mail-queue",
  async (job) => {
    console.log("message received", job.id);
    // console.log(job.data.product);
    // console.log(job.data.quantity);
    const reg_id = job.data.reg_id;
    const itemName = job.data.itemName;
    const quantity = job.data.quantity;
    const email = job.data.email;
    // console.log(reg_id);
    // console.log(itemName);
    // console.log(quantity);
    // console.log(email);

    axios
      .post("http://localhost:8080/api/sendmail", {
        reg_id,
        itemName,
        quantity,
        email,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  { connection }
);

// Listen to completed event
worker.on("completed", (job) => {
  console.log(`Job with id ${job.id} has been completed`);
});

// Listen to failed event
worker.on("failed", (job, err) => {
  console.log(`Job with id ${job.id} has failed with error ${err.message}`);
});
