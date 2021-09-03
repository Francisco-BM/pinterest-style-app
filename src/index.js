const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const {
    format
} = require('timeago.js')
const {
    v4: uuidv4
} = require('uuid');

//initialization
const app = express();
require('./database');

//setting
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); //asignacion de carpeta de vistas
app.set('view engine', 'ejs'); //asignacion de motor de plantillas

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
})
app.use(multer({
    storage: storage
}).single('image')); //
//global variables
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});
//Routes
app.use(require('./routes/index.routes'))
//static files
app.use(express.static(path.join(__dirname, 'public')));
//star the server

app.listen(app.get('port'), () => {

    console.log(`server on port ${app.get('port')}`);

})