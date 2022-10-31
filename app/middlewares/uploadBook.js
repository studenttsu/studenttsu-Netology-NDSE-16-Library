const multer = require('multer')
const { v4: uuid } = require('uuid')
const fs = require('fs');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        if (!fs.existsSync('./public/books-files')) {
            fs.mkdirSync('./public/books-files', { recursive: true });
        }

        cb(null, './public/books-files');
    },
    filename(req, file, cb) {
        cb(null, `${uuid()}-${file.originalname}`)
    }
});

const filter = (req, file, cb) => {
    if(file.mimetype === "pdf") {
        cb(null, true);
        return;
    }

    cb(null, false);
};

module.exports = multer({ storage, filter });