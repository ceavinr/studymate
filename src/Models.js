const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// modul user
const userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    photoProfile: String
})
const user = mongoose.model('user', userSchema)

// modul topic
const topicSchema = new Schema({
    name: String,
    subject: String,
    description: String,
    date: String,
    users: Array,
})
const topic = mongoose.model('topic', topicSchema)

// modul pesan
const pesanSchema = new Schema({
    pesan: String,
    date: String,
    sender: String,
    topicId: String,
})
const pesan = mongoose.model('pesan', pesanSchema)


module.exports = {
    user,
    topic,
    pesan
}