const handlers = require('./handlers.js');
const arr = [
    '/style.css',
    '/reset.css',
    '/dom.js',
    '/request.js',
    '/favicon.ico',
    '/404.html'
  ];

const router = (request, response) =>{
      console.log('I am in the router');
      const url = request.url;
    if (url === "/"){
        handlers.homeRoute(request, response);
    }else if (arr.includes(url)) {
        handlers.publicRoute(request, response, url);
        
    }else{
        response.writeHead(404, {'Content-Type':'text/html'});
        response.end('<h1>404 server error</h1>')
    }
}

module.exports = router;