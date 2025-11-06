import "../styles/netflixRecom.scss";
// @ts-ignore
import companyLogo from "../resources/companyLogo.png";
import { useState } from "react";
import { HeaderDropdown } from "./headerDropdown.tsx";

export interface HeaderProps {
    modalOpen: boolean;
    toggleModal: (toggle: boolean) => void;
}

export const Header = ({ modalOpen, toggleModal }: HeaderProps ) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    function signIn() {
        toggleModal(true);
    }

    return (
        <div className="header-section">
            <div className="site-header-logo">
                <img src={companyLogo} height="50px" width="50px"/>
                <div className="site-header-logo-text" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    Click me to know more!
                </div>
                {dropdownOpen && 
                    <HeaderDropdown />
                }
            </div>

            <span className="divider" />

            <div className="site-header-text">
                Welcome to Netflix recommendations!
            </div>

            <span className="divider" />
            <div className="sign-in-button" onClick={signIn}>
                    Sign in!
            </div>
        </div>
    )
}