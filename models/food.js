import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the Food Schema
const FoodSchema = new Schema({
    restaurantName: {
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
    mealType: {
        type: String,
        required: true,
        enum: ['Breakfast', 'Lunch', 'Dinner']
    },
    budget: {
        type: String,
        required: true,
        enum: ['Up to $100', '$100 - $200', '$200+']
    }
});

const food = mongoose.model('food', FoodSchema);
export default food;