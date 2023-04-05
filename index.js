import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";
import https from "https";
import postRoutes from "./routes/posts.js";
import userRouter from "./routes/user.js";

const key = fs.readFileSync("private.key");
const cert = fs.readFileSync("certificate.crt");

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("API Working!!!");
});

const creds = {
  key,
  cert,
};

const CONNECTION_URL =
  "mongodb+srv://rohan:jhHhTuDPNp5o4avf@cluster0.ilfgxpf.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

// app.get(
//   "/.well-known/pki-validation/6CF46F4E31415B276DEC5723363E6BC4.txt",
//   (req, res) => {
//     res.sendFile(
//       "/home/ubuntu/blog-cc-api/6CF46F4E31415B276DEC5723363E6BC4.txt"
//     );
//   }
// );

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);

app.listen(PORT, () =>
  console.log(`Server Running on Port: http://localhost:${PORT}`)
);

const httpsServer = https.createServer(creds, app);
httpsServer.listen(8443);

//jhHhTuDPNp5o4avf
