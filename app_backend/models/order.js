import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    stockid: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
        timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;