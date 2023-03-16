const { default: mongoose } = require("mongoose")


module.exports = (uri) => {
    mongoose.set('strictQuery', false);
    mongoose.connect(uri)
    .then(() => console.log('Database connected🚀'))
    .catch((err) => console.log(err.message))
}