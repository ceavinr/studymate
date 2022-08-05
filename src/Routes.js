const express = require('express')
const app = express()
const Controllers = require('./Controllers')

// user
app.post('/register', Controllers.buatUser)
app.get('/login', Controllers.loginUser)
// app.post('/create-profile', Controllers.uploadPhotoProfile, Controllers.buatPhotoProfile)

// topic
app.post('/create-topic', Controllers.createTopic)
app.get('/get-topic', Controllers.getTopic)
app.post('/update-topic', Controllers.updateTopic)

// pesan
app.post('/create-pesan', Controllers.createPesan)
app.get('/get-pesan', Controllers.getPesan)

module.exports = app
