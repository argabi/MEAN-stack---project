const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: [true, "The password is required"] },
    email: {
        type: String,
        required: true,
        match: [/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2}))\]?$/, "Enter a valid email"]
    }
},
    { timestamp: {createdAt: true, updatedAt: true} },

);

module.exports = mongoose.model('Admin', AdminSchema);