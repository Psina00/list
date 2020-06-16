const http = require('http');
const fs = require('fs');
const express = require('express');
const request = require('request');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
console.log(__dirname + "\\data.json");
const server = http.createServer();

/*server.on('request', function(request, response){
    console.log("connection OK");
    console.log(request.headers);
    response.end(file_data);
});*/
app.get('/', function(req, res){
    let locIP = req.connection.remoteAddress;
    let rqDat = JSON.stringify(req.query);
    console.log(`connection established with ${locIP}`);
    console.log(`data sent by ${locIP}: ${req.query.actionType} or ${rqDat}`);
    if(req.query.actionType=="r"){
        res.send(JSON.parse(fs.readFileSync('data.json')));
    }
    else if(req.query.actionType=="c"){
        let newDat = req.query.item;
        let fileDat = JSON.parse(fs.readFileSync('data.json'));
        fileDat.idMax++;
        fileDat.dat[fileDat.idMax] = newDat;
        fs.writeFileSync("data.json", JSON.stringify(fileDat));
        res.status(200).send(fileDat.idMax.toString());
    }
    else if(req.query.actionType=="u"){
            let newDat = req.query.item;
        let lastId = req.query.id;
        let fileDat = JSON.parse(fs.readFileSync('data.json'));
        fileDat.dat[lastId] = newDat;
        fs.writeFileSync("data.json", JSON.stringify(fileDat));
        res.status(200).send(newDat.toString());
    }
    else if(req.query.actionType=="d"){
        let lastId = req.query.id;
        let fileDat = JSON.parse(fs.readFileSync('data.json'));
        delete fileDat.dat[lastId];
        fs.writeFileSync("data.json", JSON.stringify(fileDat));
        res.status(200).send(lastId.toString());
    }
    else{
        res.status(400).send('wrong request');
    }
});
app.listen(80, 'localhost');
