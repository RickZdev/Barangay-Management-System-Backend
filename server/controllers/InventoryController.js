const mongoose = require("mongoose");
const Inventory = require("../models/inventoryModel");

const getInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find({}).sort({ createdAt: -1 });
    res.status(200).json(inventories);
  } catch (err) {
    res.status(404).json({ error: "Inventories doesnt exist!" });
  }
};

const createInventory = async (req, res) => {
  const { item, quantity } = req.body;

  // add doc to db
  try {
    const inventory = await Inventory.create({
      item,
      quantity,
    });
    res.status(200).json(inventory);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteInventory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid inventory id" });
  }

  try {
    const inventoryToDelete = await Inventory.findOne({ _id: id });

    if (inventoryToDelete) {
      await Inventory.findOneAndDelete({ _id: id });

      res.status(200).json({
        message: "Inventory deleted successfully!",
        data: inventoryToDelete,
      });
    } else {
      return res.status(404).json({ error: "No such inventory" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateInventory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid inventory id" });
  }

  try {
    const inventoryToUpdate = await Inventory.findOne({ _id: id });

    if (inventoryToUpdate) {
      await Inventory.findOneAndUpdate(
        { _id: id },
        {
          ...req.body,
        }
      );

      res.status(200).json({
        message: "inventory updated successfully!",
        data: inventoryToUpdate,
      });
    } else {
      return res.status(404).json({ error: "No such inventory" });
    }
  } catch (error) {
    res.status(404).json({ error: "No such inventory" });
  }
};

module.exports = {
  getInventories,
  createInventory,
  deleteInventory,
  updateInventory,
};
