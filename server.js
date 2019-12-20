const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

//importing all the routes and middlewares.
const uploadRoute = require('./API/Routes/upload.js');

//essential dependencies 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

//CORS Access
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
})

//Routes
app.use('/', uploadRoute);

//Error Handling for empty routes
app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.json({
        error:{
            message: err.message
        }
    })
});

module.exports = app;
