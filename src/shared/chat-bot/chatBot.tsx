import "./chatBot.scss"
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { defaultChatData } from "../../utilities/constants.tsx";

export interface ChatBotProps {
    open: boolean;
    openChatBot: (open: boolean) => void;
}

const ChatBot: FC<ChatBotProps> = ({ open, openChatBot }) => {
    const [chatResponse, setChatResponse] = useState<string>(defaultChatData.defaultMessage);
    const methods = useForm();
    const { register, getValues } = methods;

    function submitChatBotInquiry() {
        console.log("The last input inquiry was: " + getValues("chat-input"));
    }

    return (
        <div className="chat-bot-container">
            { open ? 
                <div className="chat-bot-open">
                    <div className="chat-bot-header"> 
                        <div>
                            <CloseIcon className="close-button" onClick={() => openChatBot(!open)}/>
                        </div>
                    </div>
                    <div className="chat-bot-messages">
                        {chatResponse}
                    </div>
                    <div className="chat-bot-textbox">
                        <FormProvider {...methods}>
                            <form className="chat-bot-form" onSubmit={(e) => e.preventDefault()}>
                                <input className="chat-input" type="text" {...register("chat-input")} placeholder="Type a message here..."/>
                                <button className="chat-submit" type="submit" value="submit" onClick={() => submitChatBotInquiry()} disabled={false}> 
                                    Submit 
                                </button>
                            </form>
                        </FormProvider>
                    </div>
                </div>
                : 
                <div className="chat-bot-minimized" >
                    <div className="chat-bot-minimized-text">
                        <div>
                            Need some help?
                        </div>
                    </div>
                    <div className="chat-bot-icon" onClick={() => openChatBot(true)}>
                        <ChatBubbleOutlineIcon />
                    </div>
                </div>
            }
        </div>
    )
}
export default ChatBot;