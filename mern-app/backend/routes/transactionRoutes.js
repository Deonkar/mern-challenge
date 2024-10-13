const express = require("express");
const {
  getTransactions,
  createTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

router.route("/").get(getTransactions).post(createTransaction);
// Additional routes for statistics, bar chart, pie chart can be added here.

module.exports = router;
