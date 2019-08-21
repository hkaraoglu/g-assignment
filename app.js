const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require('./routes.js');
const mongoUtil = require( './data/mongo' );
const app = express();

mongoUtil.connectToServer( function( err, client ) {
    if (err) console.log(err);
    app.emit('ready');
} );

app.use(cookieParser());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const  languageTranslator = require('language-translator');
app.use(languageTranslator.init(
    {
        langs          : ["en"],
        defaultLang    : "en",
        cookieName     : "lang",
        equalizeKeys   : true,
        translate      : false
    }));

app.use('/', routes);

const ServiceResult = require('./models/util/ServiceResult');
const serviceResult = new ServiceResult();

app.use(function(req, res, next)
{
    serviceResult.setCode(serviceResult.codes.ERROR_404)
                 .setMessage(res.locals._lt.get('error_404'));
    res.status(404);
    res.send(serviceResult.get());
});

app.use(function(err, req, res, next)
{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err.message);
    if(err.status >= 500)
    {
        serviceResult.setCode(serviceResult.codes.ERROR_5XX)
            .setMessage(res.locals._lt.get('error_5XX'));
    }
    else if(err.status >= 400 && err.status < 500)
    {
        serviceResult.setCode(serviceResult.codes.ERROR_4XX)
            .setMessage(res.locals._lt.get('error_4XX'));
    }
    else
    {
        serviceResult.setCode(serviceResult.codes.ERROR_5XX)
            .setMessage(res.locals._lt.get('error_5XX'));
    }
    res.status(err.status || 500);
    res.send(serviceResult.get());
});


const port = process.env.PORT || 3013;
app.on('ready', function()
{
    app.listen(port, () =>
    {
        console.log(`Listening on port ${port}!`);
        app.emit("appStarted");
    });
});


module.exports = app;
