import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const multiStepFormSchema = new Schema({
    package: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    numPeople: {
        type: Number,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    numAdults: {
        type: Number,
        required: true
    },
    numChildren: {
        type: Number,
        required: true
    },
    numRooms: {
        type: Number,
        required: true
    },
    hotelPackage: {
        type: String,
        required: true
    },
    entertainment: {
        type: Boolean,
        required: true
    },
    historical: {
        type: Boolean,
        required: true
    },
    religious: {
        type: Boolean,
        required: true
    },
    sea: {
        type: Boolean,
        required: true
    },
    natural: {
        type: Boolean,
        required: true
    }
});

const MultiStepForm = mongoose.model('MultiStepForm', multiStepFormSchema);

export default MultiStepForm;
