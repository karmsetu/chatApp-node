import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { addUser, getUser, getUsersInRoom, removeUser } from './users';

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // frontend URL
        methods: ['GET', 'POST'],
    },
});

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});
io.listen(4000);

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('join', ({ name, room }, callback) => {
        console.log({ name, room });
        const { error, user } = addUser({ id: socket.id, name, room });
        if (error) return callback(error);
        console.log(`joining: ${user}`);

        if (user) {
            socket.emit('message', {
                user: 'admin',
                text: `${user?.name} welcome to romm ${user?.room}`,
            });

            socket.broadcast.to(user?.room).emit('message', {
                user: 'admin',
                text: `${user.name} has joined`,
            });

            socket.join(user?.room as string);
        }
        console.log({ user });

        // callback({ message: `you have joined` });
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.log(`this user: ${user}`);
        if (user) {
            console.log(message);

            io.to(user?.room).emit('message', {
                user: user.name,
                text: message,
            });
        }
        callback();
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});
