import "./chatBot.scss"
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { defaultChatMsgs } from "../../utilities/constants.tsx";
import { chatbotRequest } from "../api-calls/apiCalls.tsx";

export interface ChatBotProps {
    open: boolean;
    openChatBot: (open: boolean) => void;
}

const ChatBot: FC<ChatBotProps> = ({ open, openChatBot }) => {
    const [userMessages, setUserMessages] = useState<string[]>([]);
    const [allMessages, setAllMessages] = useState(defaultChatMsgs)
    const methods = useForm();
    const { register, getValues, reset } = methods;

    function submitChatbotInquiry() {
        const chatMsg = getValues("chatbot-send-msg");

        setUserMessages([...userMessages, chatMsg]);
        setAllMessages(prev => [...prev, 
            <div className="chatbot-inquiry">
                {chatMsg}
            </div>
        ]);
        handleChatbotResponse();
        reset();
    };

    async function handleChatbotResponse() {
        setTimeout(() => {
                setAllMessages(prev => [...prev, 
                    <ChatbotThinking />
                ]);
        }, 500);

        const response = await chatbotRequest(getValues("chatbot-send-msg"));
        
        setAllMessages(prev => [...prev, 
            <div className="chatbot-response">
                {response}
            </div>
        ]);
    };

    return (
        <div className="chatbot-container">
            { open ? 
                <div className="chatbot-open">
                    <div className="chatbot-header"> 
                        <div className="chatbot-header-msg">
                            Chatbot
                        </div>
                        <CloseIcon className="close-button" onClick={() => openChatBot(!open)}/>
                    </div>
                    <div className="chatbot-messages">
                        {allMessages}
                    </div>
                    <div className="chatbot-textbox">
                        <FormProvider {...methods}>
                            <form className="chatbot-form" onSubmit={(e) => e.preventDefault()}>
                                <input 
                                    className="chatbot-send-msg" 
                                    id="chatbot-send-msg" 
                                    type="text" 
                                    {...register("chatbot-send-msg")}
                                    placeholder="Type a message here..."
                                />
                                <button className="chatbot-submit" type="submit" value="submit" onClick={() => submitChatbotInquiry()} disabled={false}> 
                                    Send 
                                </button>
                            </form>
                        </FormProvider>
                    </div>
                </div>
                : 
                <div className="chatbot-minimized" >
                    <div className="chatbot-minimized-text">
                        <div>
                            Need some help?
                        </div>
                    </div>
                    <div className="chatbot-icon" onClick={() => openChatBot(true)}>
                        <ChatBubbleOutlineIcon />
                    </div>
                </div>
            }
        </div>
    )
}
export default ChatBot;

export function ChatbotThinking() {
    return (
        <div className="chatbot-thinking">
            <div className="thinking-animation">
                <div className="dot">.</div>
                <div className="dot">.</div>
                <div className="dot">.</div>
            </div>
        </div>
    )
};