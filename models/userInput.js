import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const HotelDetailsSchema = new Schema({
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
    package:{type:string,required:true},
    destinations:{type:string,required:true},
    checkIn:{type: date,required:true},
    checkOut:{type: date,required:true},
    availableBudget:{
        type: String,
        required: true,
        enum: ['Budget-Friendly (Up to $1000)', 'Moderate ($1000 - $2000)', 'Comfortable ($2000-$3000)','Luxury ($3000+)']
    },
    hotelDetails: HotelDetailsSchema,
    packageType: {
        type: String,
        required: true,
        enum: ['Free', 'Standard', 'Premium']
    }
});


const userInput = mongoose.model('User-Input', userInputSchema);
export default userInput;