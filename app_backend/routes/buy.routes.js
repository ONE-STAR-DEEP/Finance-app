import express from "express";
import Order from "../models/order.js";

const router = express.Router();

router.post("/order", async (req, res) => {
  try {
    const { userid, quantity , stockid } = req.body;

    const newData = new Order({ userid, quantity , stockid });
    await newData.save();

    res.json({ message: "Purchased" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/orders/user/:userid", async (req, res) => {
  try {
    const { userid } = req.params;

    const orders = await Order.find({ userid });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.put("/update/:id", async (req, res) => {

    const {id} = req.params;

    const data = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ success: false, message: "Invalid ID" });
    }    

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true});
        return res.status(200).json({ success: true, data: updatedData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
})

export default router;