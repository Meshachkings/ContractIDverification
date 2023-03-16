const 
multer          = require('multer'),
randomstring    = require('randomstring');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        const unique = randomstring.generate(6);
        cb(null, `${unique}-${Date.now()}-${file.originalname}`);
    }
});


const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|PNG|JPG|JPEG)$/)) {
        return cb(new Error('You can upload only image files!'), false);
        
    }
    cb(null, true);
}


module.exports = {
    storage, imageFileFilter
}