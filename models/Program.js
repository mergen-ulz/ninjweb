//models/Program.js

import mongoose from 'mongoose';

const ProgramSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    teacher: String,
    price: Number,
    description: String,
    image: String,
    startDate: Date,
    endDate: Date,
    availabilityStatus: {
        type: String,
        enum: ['Available', 'Limited', 'Full'],
        default: 'Available',
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
    },

    registeredCount: {
        type: Number,
        default: 0,
    },
    capacity: {
        type: Number,
        required: true,
    },

}, { timestamps: true });

ProgramSchema.virtual('nights').get(function () {
    if (!this.startDate || !this.endDate) return 0;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.round((this.endDate - this.startDate) / oneDay);
});

ProgramSchema.set("toJSON", { virtuals: true });
ProgramSchema.set("toObject", { virtuals: true });

export default mongoose.models.Program || mongoose.model("Program", ProgramSchema);
