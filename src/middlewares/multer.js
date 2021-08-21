const multer = require('multer');
const path = require("path");

const upload = multer({
storage: multer.diskStorage({}),
fileFilter: (req,file,cb) => {
const ext = path.extname(file.originalname);
if (ext !== ".jpeg" && ext !== ".png" && ext !== ".jpg") {
cb(null, false);
} else {
cb(null, true);
}
},
filename: (req,file,cb) => {
const fileName = Date.now() + "multer" + file.originalname;
cb(null,fileName)
},
limits: {
    fileSize: 1024 * 1024
}
});

module.exports = upload