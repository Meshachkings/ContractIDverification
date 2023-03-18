require('dotenv').config();
const express       = require('express'),
      mongoose      = require('mongoose'),
      db_connect    = require('./config/db-connect'),
      url           = require('url'),
      auth          = require('./routes/users'),
      passport      = require('passport'),
      session       = require('express-session'),
      MongoStore    = require('connect-mongo');




// ---------------------------------------------------------------------
const app = express();     
const PORT = process.env.PORT || 3000;
const admin = require('./routes/contract')
const Contract = require('./models/contracts');
const get_contract = require('./routes/get_contract');

// -------------------------MIDDLEWARES---------------------------------
app.use(express.json());
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }))
db_connect(process.env.MONGO_DB)
app.use(session({
    name : 'session-id',
    secret : process.env.SESSION_SECRET,
    resave :false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_DB })
}));
app.use(passport.initialize());
app.use(passport.session());


// --------------------------DATABASE CONNECT---------------------------
// const URI = process.env.MONGO_DB
// mongoose.connect(URI)
//     .then( () => console.log("connected to mongodb successful"))
//     .catch((err) => console.log(err));

// ----------------------------ROUTES-----------------------------------
app.get('/', (req, res) => {
    res.render("html/index")
} )

app.get('/login', (req, res) => {
    res.render("html/login")
} )

app.get('/signup', (req, res) => {
    res.render("html/signup")
} )



app.use('/auth', auth)



app.use('/admin', admin)

app.get('/table', async (req, res) => {

    await Contract.find({}).sort({"_id": -1})
    .then((result) => {

        const id = 1;
        res.render("html/table", { result, id });
    })
    
    
} )
app.use('/get-contract', get_contract)

app.get('/next', (req, res) => {
    res.render("html/page2")
} )

app.get('/final', async (req, res) => {
    const number = req.query.result;
    await Contract.findOne({contract_name: number })
    .then((result) => {
        if(!result){
            return res.redirect('/')
        }
        res.render("html/final", {result})
    })
    .catch((err) => {
        console.log(err);
    })
    
} )
app.get('/document/:id', async (req, res) => {
    const id = req.params.id;
    await Contract.findById(id)
    .then((result) => {
        if(!result){
            return res.redirect('/')
        }
    
        res.render("html/document", {result})
    })
    .catch((err) => {
        console.log(err);
    })
    
} )

app.get('/delete/:id', (req, res) =>{
    const id = req.params.id;
    Contract.findByIdAndDelete(id)
    .then((result) => {
        res.redirect('/table')
    })
})



// ---------------------------LISTENING---------------------------------
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})