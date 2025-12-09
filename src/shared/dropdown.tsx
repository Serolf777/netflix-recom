import { FC, useState, useEffect } from 'react';
import "./shared.scss";

interface DropdownProps {
    customPrompt?: string;
    disablePrompt?: boolean;
    defaultOption?: string;
    dropdownOptions: string[];
    onChangeHandler: (option: string) => void;
}

const Dropdown: FC<DropdownProps> = ({ customPrompt, disablePrompt = false, defaultOption ="", dropdownOptions, onChangeHandler }) => {
    const [menuVal, setMenuVal] = useState<string>(defaultOption);

    useEffect(() => {
        setMenuVal(defaultOption);
    }, [defaultOption]);

    function selectMenuEventHandler(event: React.ChangeEvent<HTMLSelectElement>) {
      setMenuVal(event.target.value); 
      onChangeHandler(event.target.value);
    }

    return (
        <div className="dropdown-menu">
          {!disablePrompt &&
            <label className="dropdown-label">
            {customPrompt ? customPrompt:  `Select an option:`}
            </label>
          }
          <select id="option" value={menuVal} onChange={selectMenuEventHandler}>
            {dropdownOptions.map((option) => (
              <option key={option} value={option.toLowerCase()} onClick={() => onChangeHandler(option)}>{option}</option>
            ))}
          </select>
        </div>
    )
};

export default Dropdown;