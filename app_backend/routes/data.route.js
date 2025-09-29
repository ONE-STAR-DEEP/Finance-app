import express from "express";
import Data from "../models/users.js";

const router = express.Router();

router.put("/update/:id", async (req, res) => {

    const {id} = req.params;

    const data = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ success: false, message: "Invalid ID" });
    }    

    try {
        const updatedProduct = await Data.findByIdAndUpdate(id, data, { new: true});
        return res.status(200).json({ success: true, data: updatedData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const products = await Data.find({userid: id});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
})

router.put("/update/:id", async (req, res) => {

    const {id} = req.params;

    const data = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ success: false, message: "Invalid document ID" });
    }    

    try {
        const updatedData = await Data.findByIdAndUpdate(id, data, { new: true});
        return res.status(200).json({ success: true, data: updatedData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
})

export default router;