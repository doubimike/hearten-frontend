var http = require('http');http.createServer(function(req,res){    res.writeHead(200,{'Content-Type':'text/plain'});    res.end('Hello body!');}).listen(3000,'0.0.0.0');console.log('NodeJS Server sunning at http://112.74.165.24');