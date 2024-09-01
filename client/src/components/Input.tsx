import React from 'react';
import './css/input.css';

const Input = ({
    message,
    setMessage,
    sendMessage,
}: {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: (
        e:
            | React.KeyboardEvent<HTMLInputElement>
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
}) => {
    return (
        <form action="" className="form">
            <input
                type="text"
                value={message}
                name=""
                onChange={(e) => setMessage(e.target.value)}
                onKeyUp={(e) => (e.code === 'Enter' ? sendMessage(e) : null)}
                className="input"
            />
            <button className="sendButton" onClick={(e) => sendMessage(e)}>
                Send
            </button>
        </form>
    );
};

export default Input;
