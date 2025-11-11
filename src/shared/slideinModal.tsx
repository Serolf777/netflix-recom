import "../styles/netflixRecom.scss";
import {  useEffect, useRef, FC } from "react";
import CloseIcon from '@mui/icons-material/Close'
import classNames from "classnames";
import { isMobile } from "./isMobile.tsx";

export interface SlideinModalProps {
    slideinOpen: boolean;
    toggleSlidein: (toggle: boolean) => void;
}

const SlideinModal: FC<SlideinModalProps> = ({ slideinOpen, toggleSlidein }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const mobile = isMobile();

    function closeModal() {
        document.body.classList.remove('modal-open');
        toggleSlidein(false);
    }

    useEffect(() => {
        if (slideinOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [slideinOpen]);
    
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                closeModal();
            }
        }

        window.addEventListener("mousedown", handleOutsideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        }
    }, [])

    if (!slideinOpen) return <></>;

    return (
        <div className={classNames("slidein", {
            ["mobile"] : mobile
        })}>
            <div className="slidein-content" ref={ref} >
                <div className="modal-header">
                    <CloseIcon className="close-button" onClick={closeModal}/>
                </div>

                <div>Slidein Placeholder</div>
            </div>
        </div>
    )
}

export default SlideinModal;