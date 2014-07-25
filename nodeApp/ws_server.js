var http = require('http');
var io = require('socket.io');
var rpc = require('jsonrpc-ws');

var mongojs = require('mongojs');
var db = mongojs("127.0.0.1/pomogalka",["requests","users"]);

var RpcFunctions = {
    add: function (a, b) {
        resp = this;
        resp.send(a+b);

        //return { _id: "53c151cceed92e10d09530ab", name: '221weqdeq', value: 12312312 };
    },
    getAllMarkers: function () {
        resp = this;
        db.requests.find(
            {},
            {coord:1, _id:0},
            function (err, data){
                var res = data.map( function(elem){ return elem.coord } );
                console.log(res);
                resp.send(res);
            }
        );
        //return { _id: "53c151cceed92e10d09530ab", name: '221weqdeq', value: 12312312 };
    }
};

rpc.exposeModule('rpc', RpcFunctions);

server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hello world</h1>');
});

var socket = io.listen(server);
rpc.listen(socket);

server.listen(8489);
