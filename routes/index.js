const express = require("express");
const { addTimeStampToObject } = require('../middlewares');
const {
  getAllRecords,
  getSingleRecord,
  addRecord,
  deleteRecord,
  updateRecord,
} = require("../controllers");

const router = express.Router();

router.route("/").get(getAllRecords).post(addTimeStampToObject, addRecord);

router
  .route("/:id")
  .get(getSingleRecord)
  .put(updateRecord)
  .delete(deleteRecord);

module.exports = router;
