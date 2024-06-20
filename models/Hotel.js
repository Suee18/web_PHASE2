import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the Hotel Schema
const HotelSchema = new Schema({
    hotelName: {
        type: String,
        required: true,
        minLength: 1
    },
    pricePerNight: {
        type: Number,
        required: true,
        min: 0
    },
    allInclusive: {
        type: Boolean,
        required: true
    },
    fullBoard: {
        type: Boolean,
        required: true
    },
    halfBoard: {
        type: Boolean,
        required: true
    },
    breakfastOnly: {
        type: Boolean,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
});

const Hotel = mongoose.model('Hotel', HotelSchema);
export default Hotel;