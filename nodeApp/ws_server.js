var http = require('http');
var io = require('socket.io');
var rpc = require('jsonrpc-ws');
var validator = require('validator');
var md5 = require('MD5')

var mongojs = require('mongojs');
var db = mongojs("127.0.0.1/pomogalka",["requests","users"]);

var requestsFunctions = {
    addCandidate: function (params) {
        //TODO check candidate authKey
        var resp = this;
        if(params.length==2) {
            //TODO use findAndModify
            delete params[0].authKey;
            db.requests.update({_id: mongojs.ObjectId(params[1])}, {$addToSet: {candidates: params[0]}},{multi:true}, function (err) {
                if (err) {
                    resp.sendError({"message": err});
                }
                else {
                    resp.send("ok");
                }
            });
        }else
            resp.sendError({message: "Wrong data received"});
    },
    removeCandidate: function (params) {
        //TODO check candidate authKey
        var resp = this;
        if(params.length==2) {
            delete params[0].authKey;
            db.requests.update({_id: mongojs.ObjectId(params[1])}, {$pull: {candidates: params[0]}},{multi:true}, function (err) {
                if (err) {
                    resp.sendError({"message": err});
                }
                else {
                    resp.send("ok");
                }
            });
        }else
            resp.sendError({message: "Wrong data received"});
    },
    acceptCandidate: function(params){
        var resp = this;
        if(params.length==2) {
            db.requests.update({_id: mongojs.ObjectId(params[0])}, {$addToSet: {helpers: params[1]}}, {multi: true}, function (err) {
                if(err){
                    resp.sendError({"message": err});
                    return;
                }
                db.requests.findAndModify({query: {_id: mongojs.ObjectId(params[0])}, update: {$pull: {candidates: params[1]}}, new: true},  function (err,data) {
                    if (err) {
                        resp.sendError({"message": err});
                        return;
                    }
                    resp.send({helpers: data.helpers, candidates:data.candidates});
                });
            });
        }else
            resp.sendError({message: "Wrong data received"});
    },
    cancelHelper: function(params){
        var resp = this;
        if(params.length==2) {
            db.requests.findAndModify({query: {_id: mongojs.ObjectId(params[0])}, update: {$pull: {helpers: params[1]}}, new: true},  function (err,data) {
                if (err) {
                    resp.sendError({"message": err});
                    return;
                }
                resp.send({helpers: data.helpers, candidates:data.candidates});
            });
        }else
            resp.sendError({message: "Wrong data received"});
    },
    getAllMarkers: function () {
        var resp = this;
        db.requests.find(
            {},
            {coord:1, _id:0},
            function (err, data){
                var res = data.map( function(elem){ return elem.coord } );
                resp.send(res);
            }
        );
    },
    getRequest: function(id) {
        //TODO check id!=null
        var resp = this;
        console.log(id[0]);
        db.requests.findOne({_id: mongojs.ObjectId(id[0])}, function (err, data){
            if(err) resp.sendError(err);
            resp.send(data);
        });
    },
    create: function(request) {
        var resp = this;
        var id = new mongojs.ObjectId();
        request[0]._id = id;
        request[0].coord.infoWindow.content = request[0].coord.infoWindow.content.replace("_id", id);
        db.requests.insert(request[0], function (err, data){
            if(err) { resp.sendError(err); return; }
            resp.send(data);
        });
    },
    addMessage: function(params){
        var resp = this;
            if(params.length != 2) {
            resp.sendError({message: "Wrong data received"});
            return;
        }
        var requestId = params[0];
        var message = params[1];
        delete message.user.authKey;
        message.date = new Date();

        db.requests.update(
            {_id: mongojs.ObjectId(requestId)},
            {$addToSet: {messages: message}},
            {multi:true},
            function(err) {
                if (err) resp.sendError({"message": err});
                else resp.send("ok");
        });

    }

};

var usersFunctions = {
    registration: function (params) {
        var resp = this;
        //TODO check params!=null
        user = params[0];
        if(!validator.isNull(user.name) && validator.isEmail(user.email) && validator.isHexadecimal(user.pass)){
            user.reputation = 0;
            user.avatar = "photo.jpg";
            user.requests=[];
            user.helps=[];
            db.users.insert(user);
            resp.send({});
            return true;
        }else {
            resp.sendError({"message": "Data validation error!"});
            return false;
        }
    },
    login:function(params){
        var resp = this;
        //TODO check params!=null
        if(validator.isEmail(params[0].email) && validator.isHexadecimal(params[0].pass)) {
            db.users.findOne(
                {email: params[0].email, pass:params[0].pass},
                function (err, user) {
                    if(err){
                        resp.sendError({"message": err});
                        return false;
                    }
                    if(!user){
                        resp.sendError({"message": "Incorrect login data"});
                        return false;
                    }
                    user.seed = Math.random();
                    db.users.save(user);
                    resp.send({
                        authKey: md5(user.seed + user.email + user.pass),
                        _id: user._id,
                        name: user.name,
                        surname: user.surname,
                        avatar: user.avatar
                    });
                    return true;
                }
            );
        }else {
            resp.sendError({"message": "Data validation error!"});
            return false;
        }
    }
};
rpc.exposeModule('requests', requestsFunctions);
rpc.exposeModule('users', usersFunctions);

server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hello world</h1>');
});

var socket = io.listen(server);
rpc.listen(socket);

server.listen(9000);
