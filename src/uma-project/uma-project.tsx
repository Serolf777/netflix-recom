import { FC, MouseEventHandler } from 'react';
import Footer from '../shared/footer/footer.tsx';
import './uma-project.scss';
import { FormProvider, useForm } from 'react-hook-form';
import Dropdown from '../shared/dropdown.tsx';
import { staticUmaList, statTypes } from '../utilities/constants.tsx';
import { useNavigate } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UmaProject: FC = () => {
    const navigate = useNavigate();
    const methods = useForm();

    function optionSelected(option : string) {
        console.log(`option selected: ${option}`);
    };

    const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
        if (e.preventDefault) e.preventDefault();

        if (!e.currentTarget.classList.contains("active")) {
            e.currentTarget.classList.add('active');
        } else {
            e.currentTarget.classList.remove('active');
        }
    }

    return (
        <div className="uma-project-container">
            <div className="go-back" onClick={() => navigate("/")}>
                <ArrowBackIcon />
                Go Back To Home Screen
            </div>
            <div className="uma-project-page">
                <div className="uma-project-header">
                    Uma Project
                </div>
                <FormProvider { ...methods }>
                    <form className="uma-project-form">
                        <div>
                            <div className="card-type">
                                {statTypes.map(statType => 
                                    {
                                        return (
                                            <div 
                                                className={`stat-card ${statType.type}`} 
                                                onClick={(e) => handleClick(e)}
                                                id={`${statType.type}-card`}
                                            >
                                                <img
                                                    src={statType.img} 
                                                    height="50px" 
                                                    alt={statType.type}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                Test Input
                            </div>
                            <input type="text" className="searchbar" />
                        </div>
                        <Dropdown 
                            customPrompt="What's your favorite Uma Musume?" 
                            dropdownOptions={staticUmaList}
                            onChangeHandler={optionSelected}
                        />
                        <button type="submit" value="submit"> 
                            Submit 
                        </button>
                    </form>
                </FormProvider>
            </div>
            <Footer />
        </div>
    )
}

export default UmaProject;