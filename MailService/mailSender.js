const express = require("express");
const app = express();
const mailroute = require("./routes/mailroute");
app.use(express.json());

app.use("/api/", mailroute);

app.get("/", (req, res) => {
  res.send("running");
});

app.listen(8080, () => {
  console.log("message service running at " + 8080);
});
