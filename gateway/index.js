const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/customer", proxy("http://localhost:8003"));
app.use("/shopping", proxy("http://localhost:8001"));
app.use("/", proxy("http://localhost:8002")); //product

app.listen(8000, () => {
  console.log("Listening on 8000 server");
});
