import { FC, MouseEventHandler } from 'react';
import Footer from '../shared/footer/footer.tsx';
import './uma-project.scss';
import { FormProvider, useForm } from 'react-hook-form';
import Dropdown from '../shared/dropdown.tsx';
import { staticUmaList, statTypes } from '../utilities/constants.tsx';
import { useNavigate } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SupportCards from './supportCards.tsx';
import cards from './cards/cards.tsx';

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
                <div>
                    This will provide suggested cards based on your requested stat requirements.
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
                            <div className="uma-bonuses-container">
                                <div className="uma-bonuses-header">
                                    <div className="bonus-header-msg">
                                        Uma Bonuses
                                    </div>
                                    <div className="bonus-header-helper-note">
                                        The percentages on the uma's stat screen, converted to decimal. 
                                    </div>
                                </div>
                                    <div className="uma-bonuses">
                                        <label>
                                            Spd
                                        </label>
                                        <input type="number" defaultValue="1.06" min="1.00" max="1.30" step=".01" className="uma-bonus-spd" />
                                        <label>
                                            Stam
                                        </label>
                                        <input type="number" defaultValue="1.06" min="1.00" max="1.30" step=".01" className="uma-bonus-stam" />
                                        <label>
                                            Pow
                                        </label>
                                        <input type="number" defaultValue="1.06" min="1.00" max="1.30" step=".01" className="uma-bonus-pow" />
                                        <label>
                                            Guts
                                        </label>
                                        <input type="number" defaultValue="1.06" min="1.00" max="1.30" step=".01" className="uma-bonus-guts" />
                                        <label>
                                            Wit
                                        </label>
                                        <input type="number" defaultValue="1.06" min="1.00" max="1.30" step=".01" className="uma-bonus-wit" />
                                    </div>
                            </div>

                            <div className="stats-container">
                                <div className="stats-container-header">
                                    Target Stats
                                </div>
                                <div className="stats-target">
                                    <label>
                                        Spd
                                    </label>
                                    <input type="number" defaultValue="600" min="0" max="1200" className="searchbar" />
                                    <label>
                                        Stam
                                    </label>
                                    <input type="number" defaultValue="600" min="0" max="1200" className="searchbar" />
                                    <label>
                                        Pow
                                    </label>
                                    <input type="number" defaultValue="600" min="0" max="1200" className="searchbar" />
                                    <label>
                                        Guts
                                    </label>
                                    <input type="number" defaultValue="600" min="0" max="1200" className="searchbar" />
                                    <label>
                                        Wit
                                    </label>
                                    <input type="number" defaultValue="600" min="0" max="1200" className="searchbar" />
                                </div>
                            </div>
                        </div>
                        <Dropdown 
                            customPrompt="Uma Musume" 
                            dropdownOptions={staticUmaList}
                            onChangeHandler={optionSelected}
                        />
                        <button type="submit" value="submit"> 
                            Submit 
                        </button>
                    </form>
                </FormProvider>
                <div className="uma-cards-container">
                    <div className="selected-deck">
                        <div>
                            Currently selected deck area.
                        </div>
                    </div>
                    <div className="selected-card-type-container">
                        <div className="selected-card-type-header">
                            Select a Support Card To Add to your deck
                        </div>
                        <div className="selected-card-type">
                            {cards.map((card) =>
                                {
                                    return <SupportCards imgUrl={`/cardImages/support_card_s_${card.id}.png`} alt={`${card.id}`} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UmaProject;