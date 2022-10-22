const multer = require('multer')
const { v4: uuid } = require('uuid')
const fs = require('fs');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        if (!fs.existsSync('./public/images')) {
            fs.mkdirSync('./public/images', { recursive: true });
        }

        cb(null, './public/images')
    },
    filename(req, file, cb) {
        cb(null, `${uuid()}-${file.originalname}`)
    }
});

const filter = (req, file, cb) => {
    if(
        file.mimetype === "image/png"
        || file.mimetype === "image/jpg"
        || file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
        return;
    }

    cb(null, false);
};

module.exports = multer({ storage, filter });