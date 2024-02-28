import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (res, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + MAth.round(MAth.random() * 1e9);
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
