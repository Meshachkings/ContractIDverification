const Contract      = require('../models/contracts');
const router        = require('express').Router();
const uploadCtrl    = require('../config/upload');
const multer        = require('multer');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });
  


// ------------ HANDLE SINGLE ------------------
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/'); // specify the upload directory
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // specify a unique filename for each uploaded file
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // set the maximum file size limit to 5MB
  },
  fileFilter: function(req, file, cb) {
    if (file.mimetype.startsWith('image/')) { // accept only image files
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'), false);
    }
  }
});

// get admin

router.get('/', (req, res) => {
    res.render("html/admin")
} )

router.post('/post',  upload.single('image'), async (req, res) => {
    cloudinary.uploader.upload(req.file.path, function(error, result) {
        if (error) {
          console.log(error);
          return;
        }
        const { contract_name, awarded_by, awarded_to, state_, address, duration, company, contract_amount, date } = req.body;
        const image = result.secure_url;
        // console.log( result.secure_url)
        new Contract({ contract_name, awarded_by, awarded_to, state_, address, duration, company, contract_amount, date, image })
        .save()
          .then((result) => {
            res.redirect('/table')
          });
      });
})


  

module.exports = router;