import mongoose from 'mongoose';

const Schema =mongoose.Schema;
const flightSchema = new Schema({
  originCountry: { type: String, required: true },
  destinationCountry: { type: String, required: true },
  numOfFlight: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, 
  duration: { type: String, required: true }, 
  seats: { type: Number, required: true },
  gate: { type: String, required: true },
  company: { type: String, required: true },
  companyLink: { type: String, required: true }
});

const flights = mongoose.model('flights', flightSchema);

export default flights;
