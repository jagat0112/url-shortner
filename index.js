const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());

app.use("/api/url", require("./routes/url"));
app.use("/", require("./routes/index"));


app.listen(5000 || process.env.PORT, () => console.log(`Server Started...`));
