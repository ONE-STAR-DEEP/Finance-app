import express from "express";
import Data from "../models/users.js";

const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    const { userid, panNumber, idNumber, imgURL } = req.body;

    const newData = new Data({ userid, panNumber, idNumber, imgURL, bonus: 100000, balance: 0 });
    await newData.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.put("/upload/:id", async (req, res) => {

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