import { FC } from 'react';
import "./shared.scss";

interface DropdownProps {
    customPrompt?: string;
    dropdownOptions: string[];
    onChangeHandler: (option: string) => void;
}

const Dropdown: FC<DropdownProps> = ({ customPrompt, dropdownOptions, onChangeHandler }) => {

    return (
        <div className="dropdown-menu"> 
          <label className="dropdown-label">
            {customPrompt ? customPrompt:  `Select an option:`}
          </label>
          <select id="option">
            {dropdownOptions.map((option) => (
              <option key={option} value={option.toLowerCase()} onClick={() => onChangeHandler(option)}>{option}</option>
            ))}
          </select>
        </div>
    )
};

export default Dropdown;