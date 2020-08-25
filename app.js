const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

const dbURI = 'mongodb://{Username}:{Password}@{Databasename}-shard-00-00.jukaw.mongodb.net:27017,{Databasename}-shard-00-01.jukaw.mongodb.net:27017,{Databasename}-shard-00-02.jukaw.mongodb.net:27017/node-tuts?ssl=true&replicaSet=atlas-t2mkha-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(dbURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => app.listen(process.env.PORT || 5000))
    .then(() => console.log('Connetc to Database Atlas'))
    .catch((error) => console.log('Error Contect : ', error));
// Registering view engine, secara otomatis jika penulisannya seperti di bawah, maka akan menggunakan folder views sebagai default
app.set("view engine", "ejs");
// kecuali seperti ini app.set('views', 'foldernya')

// Ini digunakan untuk melakukan akses pada data seperti css dan data js static seperti bootstrap dll
// Jadi akan akses otomatis ke dalam route foler 'public'
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
})); // Coding ini digunakan untuk mendapatkan res.body
// Ini middleware otomatis, jadi tidak perlu menggunakan method next()
app.use(morgan('dev'));

// Listen Request
app.get("/", (req, res) => {
    res.redirect('/blogs');
});

// About
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About"
    });
});

// Blog Route
app.use('/blogs', blogRoutes);

// page 404 harus di paling bawah
app.use((req, res) => {
    res.status(404).render("404", {
        title: "404"
    });
});