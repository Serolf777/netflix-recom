import "../styles/netflixRecom.scss";
// @ts-ignore
import companyLogo from "../resources/companyLogo.png";
import { useState, FC } from "react";
import HeaderDropdown from "./headerDropdown.tsx";
import { isMobile } from "../shared/isMobile.tsx";
import classNames from "classnames";

export interface HeaderProps {
    modalOpen: boolean;
    toggleModal: (toggle: boolean) => void;
    toggleSlidein: (toggle: boolean) => void;
}

const Header: FC<HeaderProps> = ({ toggleModal, toggleSlidein }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const mobile = isMobile();

    function signIn() {
        toggleModal(true);
    }

    return (
        <div className="header-section">
            <div className="site-header-logo">
                <img src={companyLogo} height="50px" width="50px"/>
                <div className={classNames("site-header-logo-text", {
                    ["mobile"] : mobile
                })} onClick={() => setDropdownOpen(!dropdownOpen)}>
                    Click me to know more!
                </div>
                {dropdownOpen && 
                    <HeaderDropdown />
                }
            </div>

            <span className="divider" />

            <div className={classNames("site-header-text", {
                ["mobile"] : mobile
            })}>
                Welcome to Netflix recommendations!
            </div> 

            
            <div className="slidein-button" onClick={() => toggleSlidein(true)}>
                Slidein
            </div>

            <span className="divider" />
            
            <div className="sign-in-button" onClick={signIn}>
                    Sign in!
            </div>
        </div>
    )
};

export default Header;