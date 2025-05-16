import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        photo: { type: String },
        occupation: { type: String },
        bio: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.Teacher || mongoose.model("Teacher", TeacherSchema);
