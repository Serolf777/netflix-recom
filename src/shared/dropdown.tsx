import { FC } from 'react';
import "./shared.scss";

interface DropdownProps {
    customPrompt?: string;
    disablePrompt?: boolean;
    defaultOption?: string;
    dropdownOptions: string[];
    onChangeHandler: (option: string) => void;
}

const Dropdown: FC<DropdownProps> = ({ customPrompt, disablePrompt = false, defaultOption ="", dropdownOptions, onChangeHandler }) => {

    return (
        <div className="dropdown-menu">
          {!disablePrompt &&
            <label className="dropdown-label">
            {customPrompt ? customPrompt:  `Select an option:`}
            </label>
          }
          <select id="option" value={defaultOption} onChange={(e) => onChangeHandler(e.target.value)}>
            {dropdownOptions.map((option) => (
              <option key={option} value={option.toLowerCase()} onClick={() => onChangeHandler(option)}>{option}</option>
            ))}
          </select>
        </div>
    )
};

export default Dropdown;