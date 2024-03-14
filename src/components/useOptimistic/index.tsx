import { useState, useRef, useOptimistic } from 'react';

type Messages = {
    text: string,
    sending?: boolean,
    key?: number
}[]

interface ParentProps { 
    messages: Messages, 
    sendMessage: (message: string) => Promise<void> 
}

const deliverMessage = async (message: string) => {
    await new Promise((response) => setTimeout(response, 1000));
    return message;
}

const UseOptimisticComponent = () => {
    const [messages, setMessages] = useState<Messages>([
        { text: `Hello!!`, sending: false, key: 1 }
    ]);

    const sendMessage = async (message: string) => {
        const sentMessage = await deliverMessage(message);

        setMessages((messages) => [...messages, { text: sentMessage }]);
    };

    return (
        <ParentComponent messages={messages} sendMessage={sendMessage} />
    );
};

const ParentComponent: React.FC<ParentProps> = ({ messages, sendMessage }) => {
    const formRef = useRef(null);
    const [optimisticState, addOptimistic] = useOptimistic<Messages, string>(
        messages, // NOTE : the value to be returned initially and whenever no action is pending.
        (state, newMessage) => [...state, { text: newMessage, sending: true, key: state.length + 1 }]
    );

    const formAction = async (formData: FormData) => {
        const message = formData.get(`message`) as string;
        addOptimistic(message);
        formRef.current.reset();
        
        await sendMessage(message);
    }
    
    return (
        <>
            {optimisticState.map((message, index) => (
                <div key={index}>
                    {message.text}
                    {!!message.sending && <small> (Sending...)</small>}
                </div>
            ))}
            <form action={formAction} ref={formRef}>
                <input type="text" name="message" />
                <button type="submit">Add Message</button>
            </form>
        </>
    )
}

export default UseOptimisticComponent;