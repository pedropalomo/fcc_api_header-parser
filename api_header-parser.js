
// Main app. entry point
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


app.use(bodyParser.json({ type: '*/*' }));



app.get('*/*', function(req, res){
    var res_json;
    var err;
    
    // show request
    //console.log(req.headers);
    
    //'accept-language': 'es-ES,es;q=0.8,en;q=0.6,en-GB;q=0.4',
    var lenguage = req.headers['accept-language'].split(',')[0];
    
    // 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    var os = req.headers['user-agent']; 
    var regExp = /\(([^)]+)\)/;
    os = regExp.exec(os)[1];
    
    var res_json = {
        "ipaddress": req.headers['x-forwarded-for'] ,
        "language": lenguage,
        "software": os
    };
 
    res.send(res_json);
  });

const port = 8080;
const server = http.createServer(app);
server.listen(process.env.PORT || port)

console.log('Server listening on: ', port);