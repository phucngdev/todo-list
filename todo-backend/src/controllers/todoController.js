var fs = require("fs");

module.exports.getTodo = async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("src/data/todo.json", "utf-8"));
    res.status(200).json({ message: "Successfully!", data });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};

module.exports.getTodoById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = JSON.parse(fs.readFileSync("src/data/todo.json", "utf-8"));
    const response = await data.find((user) => user.id == id);
    res.status(200).json({ message: "Successfully!", response });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};

module.exports.addTodo = async (req, res) => {
  try {
    const dataTodo = req.body;
    const data = JSON.parse(fs.readFileSync("src/data/todo.json", "utf-8"));
    data.unshift(dataTodo);
    fs.writeFileSync("src/data/todo.json", JSON.stringify(data));
    res.status(200).json({ message: "Successfully!" });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};

module.exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = JSON.parse(fs.readFileSync("src/data/todo.json", "utf-8"));
    let findIndex = data.findIndex((todo) => {
      return todo.id == id;
    });
    if (findIndex !== -1) {
      data[findIndex].completed = !data[findIndex].completed;
      fs.writeFileSync("src/data/todo.json", JSON.stringify(data));
      res.status(200).json({ message: "Successfully" });
    } else {
      res.status(404).json({ message: "Todo item not found!" });
    }
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};

module.exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = JSON.parse(fs.readFileSync("src/data/todo.json", "utf-8"));
    const response = data.filter((todo) => {
      return todo.id != id;
    });
    fs.writeFileSync("src/data/todo.json", JSON.stringify(response));
    res.status(200).json({ message: "Delete Successfully!" });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};

module.exports.deleteAllTodo = async (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("src/data/todo.json", "utf-8"));
    data = [];
    fs.writeFileSync("src/data/todo.json", JSON.stringify(data));
    res.status(200).json({ message: "Delete Successfully!" });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};
