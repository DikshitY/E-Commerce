const multer = require('multer')

const upload = multer({
    limits: {
      fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        cb(new Error("Please upload jpeg or jpg or png files only."));
      }
      cb(undefined, true);
    },
  });

module.exports = upload