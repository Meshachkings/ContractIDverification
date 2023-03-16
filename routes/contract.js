const Contract      = require('../models/contracts');
const router        = require('express').Router();
const uploadCtrl    = require('../config/upload');
const multer        = require('multer');





// ------------ HANDLE SINGLE ------------------
const upload = multer({dest:'public/uploads'});

router.get('/', (req, res) => {
    res.render("html/admin")
} )

router.post('/post', upload.single('image'), async (req, res) => {
    const { contract_name, awarded_by, awarded_to, state_, address,
        duration, company, contract_amount } = req.body;

    const image = req.file.path;
        console.log(image)
    new Contract(
        {contract_name,awarded_by,awarded_to,state_,address,
        duration,company,contract_amount ,image}
        ).save()
        .then((result) => {
            res.redirect('/table')
        })
})


module.exports = router;