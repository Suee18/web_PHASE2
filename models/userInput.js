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


const userInputSchema= new Schema({
    package:{type:String,required:true},
    destinations:{type:String,required:true},
    checkIn:{type: Date,required:true},
    checkOut:{type: Date,required:true},
    availableBudget:{
        type: String,
        required: true,
        enum: ['Budget-Friendly (Up to $1000)', 'Moderate ($1000 - $2000)', 'Comfortable ($2000-$3000)','Luxury ($3000+)']
    },
    hotelDetails: hotelDetailsSchema,
    packageType: {
        type: String,
        required: true,
        enum: ['Free', 'Standard', 'Premium']
    }
});


const userInput = mongoose.model('User-Input', userInputSchema);
export default userInput;