import React from 'react';
import { Link } from 'react-router-dom';
import './css/join.css';

const Join = () => {
    const [name, setName] = React.useState<string>('');
    const [room, setRoom] = React.useState<string>('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        switch (e.target.placeholder) {
            case 'name':
                setName(e.target.value);
                break;

            case 'room':
                setRoom(e.target.value);
                break;
        }
    };

    const handleSubmit = (e: React.FormEvent): void => {
        if (!name && !room) e.preventDefault();
    };
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input
                        type="text"
                        placeholder="name"
                        className="joinInput"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="room"
                        className="joinInput mt-20"
                        onChange={handleChange}
                    />
                </div>

                <Link
                    to={`/chat?name=${name}&room=${room}`}
                    onClick={handleSubmit}
                >
                    <button className="button mt-20" type="submit">
                        Sign in
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Join;
