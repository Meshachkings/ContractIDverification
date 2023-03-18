const mongoose = require('mongoose');

const contract_schema = new mongoose.Schema({
    contract_name: String,
    awarded_by: String,
    awarded_to: String,
    state_: String,
    date: String,
    address: String,
    duration: String,
    company: String,
    contract_amount: String,
    image: String

})

module.exports = mongoose.model('contracts', contract_schema);