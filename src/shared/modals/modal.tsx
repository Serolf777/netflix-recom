import "./modals.scss";
import { FC, useEffect, ReactNode } from "react";
import CloseIcon from '@mui/icons-material/Close'
import { isMobile } from "../isMobile.tsx";
import classNames from "classnames";

export interface ModalProps {
    modalOpen: boolean;
    toggleModal: (toggle: boolean) => void;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({ modalOpen, toggleModal, children }) => {
    const mobile = isMobile();
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
        <div className={classNames("modal", {
            ["mobile"] : mobile
        })}>
            <div className={classNames("main-modal", {
                ["mobile"] : mobile
            })}>
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