const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sex: { type: String, required: true },
  birthday: { type: Date, required: true },
  nationality: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  avatar: { type: String, required: true },
  age: { type: Number, required: true },
  subscriptionType: { type: String, default: 'Free' },
});

userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

const User = mongoose.model('User', userSchema);

module.exports = User;
