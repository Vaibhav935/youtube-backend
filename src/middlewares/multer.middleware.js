import multer from "multer";

const storage = multer.diskStorage({
  diskStorage: (req, file, cb) => {
    return cb(null, "./public/temp");
  },
  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export { upload };
