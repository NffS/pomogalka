var http = require('http');
var io = require('socket.io');
var rpc = require('jsonrpc-ws');
var validator = require('validator');
var md5 = require('MD5')

var mongojs = require('mongojs');
var db = mongojs("127.0.0.1/pomogalka",["requests","users"]);

var RpcFunctions = {
    add: function (a) {
        var resp = this;
        resp.send({"a":a[0], "b":a[1]});
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
        var resp = this;
        db.requests.findOne({_id: id[0]},{_id: 0}, function (err, data){
            if(err) resp.sendError(err);
            resp.send(data);
        });
    }
};

var usersFuntions={
    registration: function (params) {
        resp = this;
        user = params[0];
        if(!validator.isNull(user.name) && validator.isEmail(user.email) && validator.isHexadecimal(user.pass)){
            user.reputation = 0;
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
        if(validator.isEmail(params[0].email) && validator.isHexadecimal(params[0].pass)) {
            db.users.findOne(
                {email: params[0].email, pass:params[0].pass},
                function (err, user) {
                    if(err){
                        resp.sendError({"message": err});
                        return false;
                    }
                    if(user === null){
                        resp.sendError({"message": "Incorrect login data"});
                        return false;
                    }
                    user.seed = Math.random();
                    db.users.save(user);
                    resp.send({authKey: md5(user.seed + user.email + user.pass), _id: user._id});
                    return true;
                }
            );
        }else {
            resp.sendError({"message": "Data validation error!"});
            return false;
        }
    }
};
rpc.exposeModule('rpc', RpcFunctions);
rpc.exposeModule('users', usersFuntions);

server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hello world</h1>');
});

var socket = io.listen(server);
rpc.listen(socket);

server.listen(9000);
