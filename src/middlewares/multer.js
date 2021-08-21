const multer = require('multer');

const storage = multer.memoryStorage({
    filename: (req,file,cb) => {
    const fileName = Date.now() + "multer" + file.originalname;
    cb(null,fileName)
    }
});

const upload = multer({storage: storage});

module.exports = upload