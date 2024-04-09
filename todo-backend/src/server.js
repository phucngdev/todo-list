const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const routerTodo = require("./routes/todo.route");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));
app.use(express.json());

app.use("/api/v1/todos", routerTodo);

const PORT = 8080;
app.listen(process.env.PORT || PORT, () => {
  console.log(`start server http://localhost:${PORT}`);
});
