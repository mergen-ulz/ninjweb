import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema(
    {
        programId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Program",
            required: true,
        },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        notes: { type: String },
        paid: {
            type: Boolean,
            default: false,
        },

    },
    { timestamps: true }
);

export default mongoose.models.Registration ||
    mongoose.model("Registration", RegistrationSchema);
