const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    userId: { type: String, required: false },
    amount: { type: Number, required: true },
    createDate: { type: Date, require:true},
    name: {type:String,require:true},
    email: {type: String, require: true},
    status: {type: String, require: true},
    address: {type: String, require: true},
    id: {type: String, require:true}
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
