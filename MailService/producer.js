const { Queue } = require("bullmq");

const msgq = new Queue("test-queue");

async function init() {
  const res = await msgq.add("abc", { a: "a", b: "b" });
  console.log("job added", res.id);
}

init();
