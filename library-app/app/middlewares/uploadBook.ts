import * as uuid from 'uuid';
import * as fs from "fs";
import * as multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
    destination(req, file, cb) {
        if (!fs.existsSync('./public/books-files')) {
            fs.mkdirSync('./public/books-files', { recursive: true });
        }

        cb(null, './public/books-files');
    },
    filename(req, file, cb) {
        cb(null, `${uuid.v4()}-${file.originalname}`)
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
    if(file.mimetype === "pdf") {
        cb(null, true);
        return;
    }

    cb(null, false);
};

export default multer({ storage, fileFilter });