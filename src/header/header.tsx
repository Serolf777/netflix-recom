import "../styles/netflixRecom.scss";
// @ts-ignore
import companyLogo from "../resources/companyLogo.png";
import { useState } from "react";
import { HeaderDropdown } from "./headerDropdown.tsx";

export const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
            <div className="site-header-text">
                Welcome to Netflix recommendations!
            </div>
        </div>
    )
}