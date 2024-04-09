var fs = require("fs");

module.exports.checkId = async (req, res, next) => {
  const { id } = req.params;
  const getData = JSON.parse(fs.readFileSync("src/data/todo.json", "utf-8"));
  const response = await getData.find((user) => user.id == id);
  if (response) {
    next();
  } else {
    return res.status(404).json("id not found");
  }
};
module.exports.checkTitle = async (req, res, next) => {
  const data = req.body.title;
  const getData = JSON.parse(fs.readFileSync("src/data/todo.json", "utf-8"));
  const response = await getData.find((user) => user.title == data);
  if (response) {
    return res.status(400).json("đã tồn tại title");
  } else {
    next();
  }
};
