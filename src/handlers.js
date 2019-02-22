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
    const extType = {
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
    };
    fs.readFile(filePath, (error, file) => {
      if (error) {
        console.log(error);
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('<h1>Sorry, file not found</h1>');
      } else {
          
        response.writeHead(200, { 'Content-Type': `${extType[ext]}` });
        response.end(file);
      }
    });
  };

  const handleRequest = (request, response) =>{

    console.log(request.url)
    method = request.method;
    if (method === 'GET') {
    
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

  const finalRequest = (request, response, url) =>{

    const method = request.method;
    let formatSearchName = request.url.replace(/%20/g, " ");//places spaces into url
    let formatedSearchName = formatSearchName.replace(/%27/g, "'");//places apostrophe into url
    const searchName = formatedSearchName.split('=')[1];
        console.log(searchName)
    const resultObj = spells.filter(spell => {
      let name = spell.name || spell.define || '';
      return name == searchName;
    })

    response.end(JSON.stringify(resultObj))
  }


module.exports = {
    homeRoute,
    publicRoute,
    handleRequest,
    finalRequest
}