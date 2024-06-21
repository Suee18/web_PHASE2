import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const hotelDetailsSchema = new Schema({
    numOfAdults: {
        type: Number,
        min: 1
    },
    numOfChildren: {
        type: Number,
        min: 0
    },
    numOfRooms: {
        type: Number,
        min: 1
    },
    hotelReservation: {
        type: String,
        enum: ['All Inclusive', 'All inclusive soft', 'Full Board', 'Half Board', 'Breakfast only']
    }
});

const interestSchema = new Schema({
    date: { type: Date, required: true },
    entertainment: { type: Boolean, default: false },
    historical: { type: Boolean, default: false },
    religious: { type: Boolean, default: false },
    sea: { type: Boolean, default: false },
    natural: { type: Boolean, default: false },
    day: { type: Boolean, default: false },
    night: { type: Boolean, default: false }
});

const userInputSchema= new Schema({
    package: { type: String, required: true },
    destinations: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    availableBudget: {
        type: String,
        required: true,
        // enum: ['Budget-Friendly (Up to $1000)', 'Moderate ($1000 - $2000)', 'Comfortable ($2000-$3000)','Luxury ($3000+)']
    },
    hotelDetails: hotelDetailsSchema,
    packageType: {
        type: String,
        required: true,
        enum: ['Free', 'Standard', 'Premium']
    },
    interests: [interestSchema]
});

const userInput = mongoose.model('UserInput', userInputSchema);
export default userInput;
