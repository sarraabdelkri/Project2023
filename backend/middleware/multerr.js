const multerr = require("multer");
const storage = multerr.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
  
});
const uploads = multerr({ storage: storage });
module.exports = uploads;
