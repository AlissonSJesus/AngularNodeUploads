const express = require('express');
const multer = require('multer');

const app = express();
var path = require('path');

const configArmazenamento = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

var upload = multer({ storage: configArmazenamento }).single('file');

app.use(express.static("uploads"));

app.post('/file', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        }
        console.log(req.file.path);
    });
});

app.listen(3000, () => {
    console.log('Running in port 3000!');
})