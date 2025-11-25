import "./header.scss";
import { ReactNode, FC } from "react";

interface HeaderDropdownProps {
    children: ReactNode;
}


const HeaderDropdown: FC<HeaderDropdownProps> = ( { children } ) => {
    return (
        <div className="header-dropdown">
            {children}
        </div>
    );
}

export default HeaderDropdown;