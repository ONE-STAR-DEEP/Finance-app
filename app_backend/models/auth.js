import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    username:{
        type: String,
    },
    email:{
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
}, {
        timestamps: true
});

const Auth = mongoose.model('Auth', authSchema);

export default Auth;