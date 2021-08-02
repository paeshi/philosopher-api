const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')

require("dotenv").config();
app.use(cors())
const connectionURI = process.env.DATABASE_URI;

// shortcut to mongoose.connection object
const db = mongoose.connection;

mongoose.connect(connectionURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

db.on("connected", function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
app.use(express.json());
const philosophyRouter = require("./routes/philosophers");
app.use("/philosophers", philosophyRouter);
const PORT = 3000;
app.listen(PORT, () => console.log("Listening on port " + PORT));
