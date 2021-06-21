const express = require("express");
const helmet = require('helmet')
const compression = require('compression')

const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(helmet())
app.use(compression())

app.use(express.json());



app.use("/api/url", require("./routes/url"));
app.use("/", require("./routes/index"));

const PORT  = 5000 || process.env.PORT

app.listen(PORT, () => console.log(`Server Started at ${PORT}...`));
