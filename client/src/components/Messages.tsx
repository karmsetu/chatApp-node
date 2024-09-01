import './css/messages.css';
import './css/message.css';
import ScrollToBottom from 'react-scroll-to-bottom';

const Messages = ({ messages, name }: { messages: string[]; name: string }) => {
    return (
        <ScrollToBottom>
            {messages.map((message, index) => {
                return (
                    <div key={index}>
                        <Message message={message} name={name} />
                    </div>
                );
            })}
        </ScrollToBottom>
    );
};

const Message = ({ message, name }: { message: string; name: string }) => {
    const trimmedName = name.trim().toLowerCase();
    if (user) return <></>;
};

export default Messages;
