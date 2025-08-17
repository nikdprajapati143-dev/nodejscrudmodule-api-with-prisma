import multer from "multer";
import path from "path";
import fs from "fs";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'public/uploads/profiles';
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        cb(null, uniqueName);
    }
})

export const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png|webp/;
        const ext = path.extname(file.originalname).toLowerCase();
        const mime = file.mimetype;

        if (allowed.test(ext) && allowed.test(mime)) cb(null, true);
        else cb(new Error("Only images allowed (jpeg, jpg, png, webp)"));
    }
});
