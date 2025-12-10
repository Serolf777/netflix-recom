import "./header.scss";
// @ts-ignore
import companyLogo from "../resources/companyLogo.png";
import { useState, FC, useEffect, useContext } from "react";
import HeaderDropdown from "./headerDropdown.tsx";
import { isMobile } from "../isMobile.tsx";
import { getCookies } from "../../utilities/utilityFunctions.tsx";
import { useNavigate } from 'react-router';
import classNames from "classnames";
import Modal from "../modals/modal.tsx";
import Signin from "../signin.tsx";
import Register from "../register.tsx";
import SlideinModal from "../modals/slideinModal.tsx";
import Dropdown from "../dropdown.tsx";
import { coolPokemonList, genresList, rateTheSite } from "../../utilities/constants.tsx";
import { LoginContext, LoginContextType } from "../../utilities/contexts.tsx";

export interface HeaderProps {
    setModalOpen: (toggle: boolean) => void;
    setMenuOpen: (open: boolean) => void;
    showSlideinButton?: boolean;
}

const Header: FC<HeaderProps> = ({ setModalOpen, showSlideinButton, setMenuOpen }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [signInDropdownOpen, setSignInDropdownOpen] = useState(false);
    const [showSigninModal, setShowSigninModal] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [showSlidein, setShowSlidein] = useState(false);
    const mobile = isMobile();
    const navigate =  useNavigate();
    const cookies = getCookies();
    const { username, setUsername } = useContext(LoginContext) as LoginContextType;

    function signIn() {
        setModalOpen(true);
        setShowSigninModal(true);
    }

    function signOut() {
        document.cookie = `username=${cookies["username"]}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        setUsername("");
        setSignInDropdownOpen(false);
    }

    function registerClicked() {
        setShowSigninModal(false);
        setRegisterModalOpen(true);
    }

    function slideInOptionSelected(option : string) {
        console.log(`option selected: ${option}`);
    }

    useEffect(() => {
        setUsername(cookies["username"]);
    }, [cookies["username"]]);

    useEffect(() => {
        if (showSigninModal || registerModalOpen|| showSlidein) {
            setMenuOpen(true);
        } 
        else {
            setMenuOpen(false);
        }
        if (showSigninModal || registerModalOpen) {
            setModalOpen(true);
        } 
        else {
            setModalOpen(false);
        }
    }, [showSigninModal, registerModalOpen, showSlidein]);

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

            {showSlideinButton &&
                <div className="slidein-button" onClick={() => setShowSlidein(true)}>
                    Slidein
                </div>
            }

            <span className="divider" />
            
            {username ?
                <div>
                    <div className="welcome-parent">
                        <div className="welcome-text" onClick={() => setSignInDropdownOpen(!signInDropdownOpen)}> 
                            Welcome, {username} 
                        </div>
                        {signInDropdownOpen && 
                            <HeaderDropdown>
                                <div className="account-page-link" onClick={() => navigate("/account-page")}>
                                    Account Page
                                </div>
                                <div className="signout-link" onClick={signOut}>
                                    Sign out?
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

            <Modal modalOpen={showSigninModal} toggleModal={setShowSigninModal}>
                <Signin submitClicked={() => setShowSigninModal(false)} registerClicked={registerClicked}/> 
            </Modal>

            <Modal modalOpen={registerModalOpen} toggleModal={setRegisterModalOpen}>
                <Register toggleSignin={() => setRegisterModalOpen(false)} />
            </Modal>

            <SlideinModal slideinOpen={showSlidein} toggleSlidein={setShowSlidein}>
                <div>
                    <div>Look at this slide in!</div>
                    <Dropdown 
                        dropdownOptions={genresList}
                        onChangeHandler={slideInOptionSelected}
                    />
                    <Dropdown 
                        customPrompt="What's your favorite pokemon?" 
                        dropdownOptions={coolPokemonList}
                        onChangeHandler={slideInOptionSelected}
                    />
                    <Dropdown
                        customPrompt="What would you rate this site?"
                        dropdownOptions={rateTheSite} 
                        onChangeHandler={slideInOptionSelected}
                    />
                </div>
            </SlideinModal>
        </div>
    )
};

export default Header;