const { readFile, writeFile } = require("../utils");

const getAllRecords = (req, res) => {
  try {
    const fileData = readFile("../data/collections.json");

    res.status(200).json({
      success: true,
      data: JSON.parse(fileData),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const getSingleRecord = (req, res) => {
  const { id } = req.params;

  try {
    const fileData = readFile("../data/collections.json");
    const value = JSON.parse(fileData).filter(
      (obj) => Number(obj.id) === Number(id)
    );

    if (value.length) {
      res.status(200).json({
        success: true,
        length: value.length,
        data: value,
      });
    } else {
      res.status(201).json({
        success: true,
        data: [],
        length: 0,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const addRecord = (req, res) => {
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
      res.status(400).json({
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

const deleteRecord = (req, res) => {
  const { id } = req.params;

  try {
    const fileData = JSON.parse(readFile("../data/collections.json"));
    const index = fileData.findIndex((obj) => Number(obj.id) === Number(id));

    if (index !== -1) {
      fileData.splice(index, 1);
      writeFile("../data/collections.json", JSON.stringify(fileData));
      return res.status(200).json({
        success: true,
        message: `Deleted record with id ${id}`,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No such record for delete :(",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const updateRecord = (req, res) => {
  const { user } = req.body;
  const { id } = req.params;

  try {
    const fileData = JSON.parse(readFile("../data/collections.json"));
    const index = fileData.findIndex((obj) => Number(obj.id) === Number(id));

    if (index >= 0) {
      Object.keys(user).forEach((key) => {
        fileData[index][key] = user[key];
      });

      writeFile("../data/collections.json", JSON.stringify(fileData));

      return res.status(200).json({
        success: true,
        data: fileData,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No such record found :(",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

module.exports = {
  getAllRecords,
  getSingleRecord,
  addRecord,
  deleteRecord,
  updateRecord,
};
