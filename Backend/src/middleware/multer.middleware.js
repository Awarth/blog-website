import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const suffix = `${uuidv4()}-${Date.now()}`;
    const extension = file.originalname.split(".").pop();
    cb(null, `${suffix}.${extension}`);
  },
});

export const upload = multer({
  storage,
});
