import express from "express";
import mongoose from 'mongoose';
import Product from "../models/Product.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success: false, message: "Provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
})

router.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
})

router.delete("/:id", async (req, res) =>{

    try {
        const id = req.params.id; // or const { id } = req.params;
        await Product.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Product deleted", productID: id });
        
    } catch (error) {
        console.log(error);
        return res.status(404).json({ success: false, message: "Product not found", productID: id });
    }
})

router.put("/:id", async (req, res) => {

    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }    

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true});
        return res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
})

export default router;