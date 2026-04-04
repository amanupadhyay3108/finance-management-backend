import Record from "../models/Record.js";

export const getDashboard = async (req, res) => {
  try {
    const records = await Record.find({ createdBy: req.user.id });

    let totalIncome = 0;
    let totalExpense = 0;

    records.forEach((record) => {
      if (record.type === "income") {
        totalIncome += record.amount;
      } else {
        totalExpense += record.amount;
      }
    });

    const netBalance = totalIncome - totalExpense; // 🔥 ADD THIS

    res.json({
      totalIncome,
      totalExpense,
      netBalance
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};