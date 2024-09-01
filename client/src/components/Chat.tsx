import './css/chat.css';
import { useSearchParams } from 'react-router-dom';
import { socket } from '../socket';
import React from 'react';
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';

const Chat = () => {
    const [data] = useSearchParams();
    const [name] = React.useState<string>(data.get('name') ?? '');
    const [room] = React.useState<string>(data.get('room') ?? '');
    const [messages, setMessages] = React.useState<string[]>([]);
    const [message, setMessage] = React.useState<string>('');

    React.useEffect(() => {
        socket.connect();
        socket.emit('join', { name, room }, (message: string) => {
            console.log(message);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    React.useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessage) => [...prevMessage, message]);
        });
        console.log(messages);
    }, [messages]);

    const sendMessage = (
        e:
            | React.KeyboardEvent<HTMLInputElement>
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        console.log(`sending message, ${message}`);

        if (message) socket.emit('sendMessage', message, () => setMessage(''));
    };

    // socket.connect();
    // socket.on('connect', () => console.log(`connected`));
    // console.log(socket);
    return (
        <>
            <div className="outerContainer">
                <div className="container">
                    <InfoBar room={room} />
                    <Messages messages={messages} name={name} />
                    <Input
                        message={message}
                        sendMessage={sendMessage}
                        setMessage={setMessage}
                    />
                </div>
            </div>
        </>
    );
};

export default Chat;
