import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sex: { type: String, required: true },
  birthday: { type: Date, required: true },
  nationality: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  avatar: { type: String, required: true }
});

//default avatar for each account on sign up 
userSchema.pre('validate', function(next) {
  if (!this.avatar) {
    this.avatar = this.sex === 'female' ? '/images/avatars/female_default.png' : '/images/avatars/male_default.png';
  }
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
