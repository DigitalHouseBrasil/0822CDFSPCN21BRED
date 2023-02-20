const multer = require('multer');


module.exports = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, './public/photos'),
        filename: (req, file, cb) => cb(null, Date.now() + file.originalname)
    })
}