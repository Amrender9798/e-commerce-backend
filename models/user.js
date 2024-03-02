// models/user.js
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

const User = model('User', userSchema);

export default User;
