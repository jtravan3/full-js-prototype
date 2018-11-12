// import https from 'https';
//
// https.get('https://www.lynda.com', res => {
//     console.log('Response status code: ', res.statusCode);
//
//     res.on('data', chunk => {
//         console.log(chunk.toString());
//     })
// });

// import http from 'http';
// //
// // const server = http.createServer();
// //
// // server.listen(8080);
// //
// // server.on('request', (req, res) => {
// //     res.write('HELLO HTTP!\n');
// //     setTimeout(() => {
// //         res.write('I can stream!\n');
// //         res.end();
// //     }, 3000);
// // });

// server.get('/about.html', (req, res) => {
//     fs.readFile('./about.html', (err, data) => {
//         res.send(data.toString());
//     });
// });


// import fs from 'fs';

import config from './config';
import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';

import express from 'express';
const server = express();

server.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public')
}));

server.set('view engine', 'ejs');

import serverRender from './api/serverRender';


server.get(['/', '/contest/:contestId'], (req, res) => {
    serverRender(req.params.contestId)
        .then(( {initialMarkup, initialData} ) => {
            res.render('index', {
                initialMarkup,
                initialData
            });
        })
        .catch(console.err);
});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, config.host, () => {
    console.info('Express listening on port ', config.port);
});