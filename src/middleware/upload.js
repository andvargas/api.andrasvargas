// const util = require("util");
const multer = require("multer");
// const GridFsStorage = require("multer-gridfs-storage");

const upload = multer({
    limits: {
        fileSize: 1000000 // 1Mb
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('File must be jpg, png...'))
        }
        cb(undefined, true)
    }
})

module.exports = upload;