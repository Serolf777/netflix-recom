import "../styles/netflixRecom.scss";
import {  useEffect, useState, FC, ReactNode } from "react";
import CloseIcon from '@mui/icons-material/Close'

export interface ModalProps {
    modalOpen: boolean;
    toggleModal: (toggle: boolean) => void;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({ modalOpen, toggleModal, children }) => {
    function closeModal() {
        document.body.classList.remove('modal-open');
        toggleModal(false);
    }

    useEffect(() => {
        if (modalOpen) {
            document.body.classList.add('modal-open');
        } else {
            closeModal();
        }
    }, [modalOpen]);

    if (!modalOpen) return <></>;

    return (
        <div className="modal">
            <div className="main-modal">
                <div className="modal-header">
                    <CloseIcon className="close-button" onClick={closeModal}/>
                </div>

                {children}

            </div>
            <div className="background"></div>
        </div>
    )
};

export default Modal;