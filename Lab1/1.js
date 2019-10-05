const http = require('http');

let h = (r)=>{
  let rc = '';
  for(key in r.headers) rc += '<h3>'+key+':'+r.headers[key]+'</h3>';
  return rc;
}

http.createServer(function (request, response) {
    let b = '';
    request.on('data', str=>{b+=str; console.log('data', b);})
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    request.on('end', ()=> response.end(
                                            '<!DOCTYPE html> <html><head></head>'+
                                            '<body>'+
                                            '<h1>Request content</h1>'+
                                            '<h2>'+'method: '+ request.method + '</h2>'+
                                            '<h2>'+'uri: '+ request.uri + '</h2>'+
                                            '<h2>'+'version: '+ request.httpVersion + '</h2>'+
                                            '<h2>'+'headers:'+'</h2>'+
                                            h(request)+
                                            '<h2>'+'body:'+ b +'</h2>'+
                                            '</body>'+
                                            '</html>'
                                        )
                )
}).listen(3000);

console.log('Start server at http://localhost:3000/');
