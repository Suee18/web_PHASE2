import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  username: { type: String, required: true },
  avatar: { type: String, required: true },
  comment: { type: String, required: true },
  rate: { type: Number, min: 1, max: 5, required: true },
  created_at: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review',reviewSchema);
export default Review;
