import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    panNumber: {
        type: String,
        required: true
    },
    idNumber: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
    },
    bonus: {
        type: Number,
    },
    balance: {
        type: Number,
    }
}, {
    timestamps: true
});

const Data = mongoose.model('Data', dataSchema);

export default Data;