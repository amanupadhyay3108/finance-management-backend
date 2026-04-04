import Record from "../models/Record.js";

/* ===== CREATE RECORD ===== */
export const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date } = req.body;

    if (!amount || !type || !category || !date) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const record = await Record.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* ===== GET RECORDS ===== */

export const getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    let filter = {
      createdBy: req.user.id
    };

    // Filter by type (income/expense)
    if (type) {
      filter.type = type;
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter by date range
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const records = await Record.find(filter);

    res.json(records);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* ===== UPDATE RECORD ===== */
export const updateRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ msg: "Record not found" });
    }

    res.json(record);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* ===== DELETE RECORD ===== */
export const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({ msg: "Record not found" });
    }

    res.json({ msg: "Record deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};