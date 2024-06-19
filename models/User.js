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
  avatar: { type: String, required: true },
  age : {type: Number, required: true},
});
//age 
userSchema.pre('save', function(next) {
  const today = new Date();
  const birthDate = new Date(this.birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  this.age = age;
  // this.birthday = new Date(this.birthday.setHours(0, 0, 0, 0)); // Set time to 00:00:00:000
  next();
});
//default avatar for each account on sign up 
userSchema.pre('validate', function(next) {
  const today = new Date();
  const birthDate = new Date(this.birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  this.age = age;

  if (!this.avatar) {
    this.avatar = this.sex === 'female' ? '/images/avatars/female_default.png' : '/images/avatars/male_default.png';
  }

  next();
});

const User = mongoose.model('User', userSchema);
export default User;
