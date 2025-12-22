import "./chatBot.scss"
import { FC, useState, useEffect } from "react";
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
    const [chatBotLoading, setChatBotLoading] = useState<boolean>(false);
    const [chatBotResponse, setChatBotResponse] = useState<string>("");

    function submitChatbotInquiry() {
        const chatMsg = getValues("chatbot-send-msg");

        setUserMessages([...userMessages, chatMsg]);
        setAllMessages(prev => [...prev, 
            <div className="chatbot-inquiry" key={`chatBot-inquiry ${allMessages.length + 1}`}>
                {chatMsg}
            </div>
        ]);
        handleChatbotResponse();
        reset();
    };

    async function handleChatbotResponse() {
        setChatBotLoading(true);
        const response = await chatbotRequest(getValues("chatbot-send-msg"))
            .finally(() => setChatBotLoading(false))
            .catch((error) => {
                console.log(error);
            });
        setChatBotResponse(response);
    };

    useEffect(() => {
        if (chatBotLoading) {
            setTimeout(() => {
                setAllMessages(prev => [...prev, 
                    <ChatbotThinking key={`chatBot-thinking ${allMessages.length + 1}`} />
                ]);
            }, 500);
        } 
        else if (chatBotResponse && !chatBotLoading) {
            const updatedResponses = [...allMessages]

            updatedResponses.pop();

            updatedResponses?.push(
                <div className="chatbot-response" key={`chatBot-response ${allMessages.length + 1}`}>
                    {chatBotResponse}
                </div>
            );

            setAllMessages(updatedResponses);
        }
    }, [chatBotLoading, chatBotResponse])

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