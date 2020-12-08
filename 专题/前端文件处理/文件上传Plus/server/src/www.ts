import app from './app';
import http from 'http';

const port = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error: any) {
    console.error(error);
}

function onListening() {
    console.log('Listening on ' + port);
}
