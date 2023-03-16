const Contract      = require('../models/contracts');
const router        = require('express').Router();
const  url           = require('url');


router.post('/', async (req, res) => {
    const number = req.body.number;

    
        res.redirect(url.format({
            pathname:"/final",
            query: {
               "result": number,
              
             }
          }));
   
})

module.exports = router;