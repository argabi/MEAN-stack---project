const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, default: "Not added" },
        level: { type: String, required: true },
        field: { type: String, required: true },
        city: { type: String, required: true },
        type: { type: String, required: true },     // part-time
        company: { type: String, required: true },
        recruiter: { type: String, required: true },
        applied_users: [Schema.Types.Mixed]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
