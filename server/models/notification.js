const mongoose = require('mongoose');

const notifSchema = mongoose.Schema({
    title: {
        type: String,

    }
},{ timestamps: true})

module.exports = mongoose.model('Notification', notifSchema)