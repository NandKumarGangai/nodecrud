const { readFile, writeFile } = require("../utils");

const addUser = (req, res) => {
  const { user } = req.body;

  try {
    const fileData = JSON.parse(readFile("../data/collections.json"));
    const index = fileData.findIndex((obj) => Number(obj.id) === user.id);

    if (index === -1) {
      fileData.push(user);
      writeFile("../data/collections.json", JSON.stringify(fileData));
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(201).json({
        success: false,
        message: "User already exists!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const verifyUser = (req, res) => {
  res.json({
    success: true,
    data: "user verified successfully",
  });
};
module.exports = {
  addUser,
  verifyUser,
};
