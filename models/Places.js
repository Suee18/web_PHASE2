import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the Places Schema
const PlacesSchema = new Schema({
    placeName: {
        type: String,
        required: true,
        minLength: 1
    },
    description: {
        type: String,
        required: true,
        minLength: 1
    },
    governorate: {
        type: String,
        required: true,
        minLength: 1
    },
    city: {
        type: String,
        required: true,
        minLength: 1
    },
    typeOfPlace: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: true,
    }
});

const Place = mongoose.model('Place', PlacesSchema);
export default Place;
