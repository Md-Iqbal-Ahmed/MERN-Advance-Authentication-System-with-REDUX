require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

const URI = process.env.MONGODB_URL;

mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connect to MongoDB");
  }
);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.json({ msg: "welcome to the Advance login system" });
});

app.use("/user/", require("./routes/userRoutes"));
app.use("/api/", require("./routes/uploadRouter"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
