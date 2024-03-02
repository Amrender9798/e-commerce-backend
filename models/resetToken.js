import { Schema, model } from "mongoose";

const resetTokenSchema = new Schema({
    email: String,
    token: String,
    createdAt: { type: Date, expires: '1h', default: Date.now },
});

const ResetToken = model('ResetToken',resetTokenSchema);

export default ResetToken;