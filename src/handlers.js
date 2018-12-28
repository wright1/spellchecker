const fs = require('fs');
const path = require('path');
const spells = require('./data/spells.json');

const homeRoute = (request, response) => {

    const method = request.method;
    const filePath = path.join(__dirname, '..', 'public', 'index.html');
    fs.readFile(filePath, (error, file) =>{
        if (error){
            console.log(error)
            response.writeHead(500, {'Content-Type': 'text/html'})
            response.end("<h1>Sorry we're having problems at our end.</h1>")
        } else{
            response.writeHead(200, {'Content-Type':'text/html'})
            response.end(file)
        }
    })
}

const publicRoute = (request, response, url) => {
    const method = request.method;
    const filePath = path.join(__dirname, '..', 'public', url);
    const ext = url.split('.')[1];
    console.log(url)
    console.log(ext)
    const extType = {
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
      ico: 'image/x-icon'
    };
    fs.readFile(filePath, (error, file) => {
      if (error) {
        console.log(error);
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('<h1>Sorry, file not found</h1>');
      } else {
          console.log(extType[ext])
        response.writeHead(200, { 'Content-Type': `${extType[ext]}` });
        response.end(file);
      }
    });
  };

  const handleRequest = (request, response) =>{
    method = request.method;
    if (method === 'GET') {
      // console.log('spells', spells[0]); // currently not logging!
      //console.log(request.url.split('=')[1]);
      const inputValue = request.url.split('=')[1];
  
      const filteredNames = spells.filter((spell) => {
        const name = spell.name || spell.define || '';
        if (name.toLowerCase().startsWith(inputValue.toLowerCase())) {
          return name;
        }
      })
      response.end(JSON.stringify(filteredNames));
    }
  };


module.exports = {
    homeRoute,
    publicRoute,
    handleRequest
}