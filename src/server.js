const http = require('http');
const router = require('./router');
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

const server = http.createServer(router);

server.listen(port, () => {
    console.log(`Ther server is listening at port ${port}`)
})