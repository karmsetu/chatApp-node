// src/index.js
import express, { Express, Request, Response } from 'express';
import { Server as SocketIoServer } from 'socket.io';
import { createServer } from 'node:http';
import router from './router';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
app.use(router);
const port = process.env.PORT || 3000;
const server = createServer(app);
const io = new SocketIoServer(server);

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>hello!</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user left');
    });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
