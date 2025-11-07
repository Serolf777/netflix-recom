import "../styles/netflixRecom.scss";
import {  useEffect, useRef } from "react";
import CloseIcon from '@mui/icons-material/Close'

export interface ModalProps {
    modalOpen: boolean;
    toggleModal: (toggle: boolean) => void;
}

export default function Modal({ modalOpen, toggleModal } : ModalProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    function closeModal() {
        document.body.classList.remove('modal-open');
        toggleModal(false)
    }

    useEffect(() => {
        if (modalOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [modalOpen]);
    
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

    return (
        <div className="modal" ref={ref} >
            <div className="main-modal">
                <div className="modal-header">
                    <CloseIcon className="close-button" onClick={closeModal}/>
                </div>

                <div>Sign in placeholder</div>
            </div>
            <div className="background"></div>
        </div>
    )
}