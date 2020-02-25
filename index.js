const express = require('express');
const http = require('http');
const path = require('path');
const config = require('./config/index');
const PORT = process.env.PORT || config.get('port'); // 80;
const log = require('./libs/log')(module);

const app = express();
app.set('port', PORT);
http.createServer(app).listen(app.get('port'),function(){
    log.info('Express server listening on port' + config.get('port'));
})

app.use(function(req, res, next){
    if(req.url=='/'){
        res.end("Hello");
    } else {
        next();
    }
});
app.use(function(err, req, res, next){
    if(app.get('env') == 'development'){
        const errorHandler = express.errorHandler();
        errorHandler(err, req, res, next);
    } else{
        res.send(500, "");
    }
});
