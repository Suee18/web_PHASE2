// models/VisitCounter.js
import mongoose from 'mongoose';

const visitCounterSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  },
  count: {
    type: Number,
    default: 0
  }
});

const VisitCounter = mongoose.model('VisitCounter', visitCounterSchema);

export default VisitCounter;
