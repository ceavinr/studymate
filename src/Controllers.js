const models = require('./Models')

// set up multer 
// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//         const name = Date.now().toString() + '-' + file.originalname
//         cb(null, name)
//     }
// })

// exports.uploadPhotoProfile = multer({ storage: storage }).single('photoProfile')

// exports.buatPhotoProfile = (req, res) => {
//     // update user photo profile
//     console.log(req.file.path);
//     res.send(req.file.path).status(200)
// }

// create user
exports.buatUser = async (req, res) => {
    const user = new models.user({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        photoProfile: "-",
    })

    try{
        const saveUser = await user.save()
        res.send(saveUser)
    }catch{
        res.status(400).send(err)
    }
}

// login user
exports.loginUser = async (req, res) => {
    // cek apakah akun ada berdasar email dan password benar
    const akunAda = await models.user.findOne({username: req.query.username})
    if (akunAda){
        const passwordBenar = req.query.password === akunAda.password
        if(passwordBenar){
            res.send(akunAda)
        }else{
            res.status(400).send({msg:'username or password wrong'})
        }
    }else{
        res.status(400).send({msg: 'username or password wrong'})
    }
}

// get user
exports.getUser = async (req, res) => {
    const user = await models.user.findOne({_id: req.query._id})
    res.status(400).send(user.username)
}


// create topic
exports.createTopic = async (req, res) => {
    const time = new Date().toString()
    const topic = new models.topic({
        name: req.body.name,
        subject: req.body.subject,
        description: req.body.description,
        date: time.substring(4,24),
        users: [req.body.user],
    })

    try{
        const saveTopic = await topic.save()
        res.status(200).send(saveTopic)
    }catch{
        res.status(400).send(err)
    }
}

// update topic
exports.updateTopic = async (req, res) => {
    const ticket = await models.topic.findOneAndUpdate({_id: req.body._id}, {users: req.body.users}, {new: true})
    res.status(200).send(ticket)
}

// get topic
exports.getTopic = async (req, res) => { 
    topic = await models.topic.find()
    res.status(200).send(topic)
}

// create pesan
exports.createPesan = async (req, res) => {
    const time = new Date().toString()
    const pesan = new models.pesan({
        pesan: req.body.pesan,
        date: time.substring(4,24),
        sender: req.body.sender,
        topicId: req.body.topicId,
    })

    try{
        const savePesan = await pesan.save()
        res.status(200).send(savePesan)
    }catch{
        res.status(400).send(err)
    }
}   

// get pesan
exports.getPesan = async (req, res) => {
    const pesan = await models.pesan.find({topicId: req.query.topic})
    res.status(200).send(pesan)
}