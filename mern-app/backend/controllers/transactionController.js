const Transaction = require("../models/Transaction");

// @desc    Fetch all transactions
// @route   GET /api/transactions
// @access  Public
const getTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search = "", month = "March" } = req.query;

  const query = {
    // Match transactions based on search and month
    title: { $regex: search, $options: "i" },
    dateOfSale: {
      $gte: new Date(`${new Date().getFullYear()}-${month}-01`),
      $lt: new Date(`${new Date().getFullYear()}-${month}-01T23:59:59.999Z`),
    },
  };

  try {
    const total = await Transaction.countDocuments(query);
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));
    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

// @desc    Create a transaction
// @route   POST /api/transactions
// @access  Public
const createTransaction = async (req, res) => {
  const { title, description, price, category } = req.body;

  const transaction = new Transaction({ title, description, price, category });
  try {
    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: "Error creating transaction", error });
  }
};

// Other controller functions (statistics, bar chart, pie chart) can be added here.

module.exports = {
  getTransactions,
  createTransaction,
};
