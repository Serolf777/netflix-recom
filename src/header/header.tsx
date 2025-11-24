import "../styles/netflixRecom.scss";
// @ts-ignore
import companyLogo from "../resources/companyLogo.png";
import { useState, FC } from "react";
import HeaderDropdown from "./headerDropdown.tsx";
import { isMobile } from "../shared/isMobile.tsx";
import { getCookies } from "../utilities/utilityFunctions.tsx";
import { useNavigate } from 'react-router';
import classNames from "classnames";

export interface HeaderProps {
    modalOpen: boolean;
    toggleModal: (toggle: boolean) => void;
    toggleSlidein: (toggle: boolean) => void;
}

const Header: FC<HeaderProps> = ({ toggleModal, toggleSlidein }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [signInDropdownOpen, setSignInDropdownOpen] = useState(false);
    const mobile = isMobile();
    const navigate =  useNavigate();

    function signIn() {
        toggleModal(true);
    }

    const cookies = getCookies();

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
                    <HeaderDropdown>
                        <div>This will tell you some important information!</div>
                        <div>At least it will in the future.</div>
                        <div>But for now it's stock data.</div>
                    </HeaderDropdown>
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
            
            {cookies["username"] ?
                <div>
                    <div className="welcome-parent">
                        <div className="welcome-text" onClick={() => setSignInDropdownOpen(!signInDropdownOpen)}> 
                            Welcome, {cookies["username"]} 
                        </div>
                        {signInDropdownOpen && 
                            <HeaderDropdown>
                                <div className="account-page-link" onClick={() => navigate("/account-page")}>
                                    Account Page
                                </div>
                            </HeaderDropdown>
                        }
                    </div>
                </div>
            :
                <div className="sign-in-button" onClick={signIn}>
                    Sign in!
            </div>
            }
        </div>
    )
};

export default Header;