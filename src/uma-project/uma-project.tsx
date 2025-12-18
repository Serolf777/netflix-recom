import { FC, MouseEventHandler, useState } from 'react';
import Footer from '../shared/footer/footer.tsx';
import './uma-project.scss';
import { FormProvider, useForm } from 'react-hook-form';
import Dropdown from '../shared/dropdown.tsx';
import { staticUmaList, statTypes } from '../utilities/constants.tsx';
import { useNavigate } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SupportCards from './supportCards.tsx';
import cards from './cards/cards.tsx';
import { RarityFilter } from './cards/cards-interfaces.tsx';
import { defaultLbFilter } from './constants/constants.tsx';

const UmaProject: FC = () => {
    const navigate = useNavigate();
    const methods = useForm();
    const [raritiesFilter, setRaritiesFilter] = useState<RarityFilter[]>(defaultLbFilter);

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

    function rarityCheckBoxHandler(rarity: number, lb: number) {
        const targetedFilter = raritiesFilter.find((filter) => filter.rarity === rarity);

        if (targetedFilter && targetedFilter.rarity === rarity && !targetedFilter.lb.includes(lb)) {
            targetedFilter.lb.push(lb);
        } else if (targetedFilter && targetedFilter.rarity === rarity) {
            targetedFilter.lb = targetedFilter.lb.filter(number => number !== lb);
        }

        setRaritiesFilter(raritiesFilter.map(filter => {
            if (targetedFilter && filter.rarity === rarity) {
                return {...filter, lb: targetedFilter.lb } 
            } else {
                return filter;
            }
        }))
    };

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
                                                key={`${statType.type}-card`}
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
                        <div className="card-filters-container">
                            <div className="ssr-filter-container">
                                <div className="ssr-filter-header">
                                    SSR
                                </div>
                                <div className="checkbox-container">
                                    <div className="lb">
                                        ◆◆◆◆
                                    </div>
                                    <div className="non-lb">
                                    </div>
                                    <input type="checkbox" defaultChecked={true} onClick={() => rarityCheckBoxHandler(3, 4)} />
                                </div>
                                <div className="checkbox-container">
                                    <div className="lb">
                                        ◆◆◆
                                    </div>
                                    <div className="non-lb">
                                        ◆
                                    </div>
                                    <input type="checkbox" defaultChecked={true} onClick={() => rarityCheckBoxHandler(3, 3)} />
                                </div>
                                <div className="checkbox-container">
                                    <div className="lb">
                                        ◆◆
                                    </div>
                                    <div className="non-lb">
                                        ◆◆
                                    </div>
                                    <input type="checkbox" defaultChecked={true} onClick={() => rarityCheckBoxHandler(3, 2)} />
                                </div>
                                <div className="checkbox-container">
                                    <div className="lb">
                                        ◆
                                    </div>
                                    <div className="non-lb">
                                        ◆◆◆
                                    </div>
                                    <input type="checkbox" defaultChecked={true} onClick={() => rarityCheckBoxHandler(3, 1)} />
                                </div>
                                <div className="checkbox-container">
                                    <div className="lb">
                                    </div>
                                    <div className="non-lb">
                                        ◆◆◆◆
                                    </div>
                                    <input type="checkbox" defaultChecked={true} onClick={() => rarityCheckBoxHandler(3, 0)} />
                                </div>
                            </div>
                            <div className="sr-filter-container">
                                <div className="sr-filter-header">
                                    SR
                                </div>
                                <div className="checkbox-container">
                                    <div className="lb">
                                        ◆◆◆◆
                                    </div>
                                    <div className="non-lb">
                                    </div>
                                    <input type="checkbox" defaultChecked={true} onClick={() => rarityCheckBoxHandler(2, 4)} />
                                </div>
                                <div className="checkbox-container">
                                    <div className="lb">
                                        ◆◆◆
                                    </div>
                                    <div className="non-lb">
                                        ◆
                                    </div>
                                    <input type="checkbox" defaultChecked={true} onClick={() => rarityCheckBoxHandler(2, 3)} />
                                </div>
                                <div className="checkbox-container">
                                    <div className="lb">
                                        ◆◆
                                    </div>
                                    <div className="non-lb">
                                        ◆◆
                                    </div>
                                    <input type="checkbox" defaultChecked={true} onClick={() => rarityCheckBoxHandler(2, 2)} />
                                </div>
                                <div className="checkbox-container">
                                    <div className="lb">
                                        ◆
                                    </div>
                                    <div className="non-lb">
                                        ◆◆◆
                                    </div>
                                    <input type="checkbox" defaultChecked={true} onClick={() => rarityCheckBoxHandler(2, 1)} />
                                </div>
                                <div className="checkbox-container">
                                    <div className="lb">
                                    </div>
                                    <div className="non-lb">
                                        ◆◆◆◆
                                    </div>
                                    <input type="checkbox" defaultChecked={true} onClick={() => rarityCheckBoxHandler(2, 0)} />
                                </div>
                            </div>
                            <div className="r-filter-container">
                                <div className="r-filter-header">
                                    R
                                </div>
                                <div className="checkbox-container">
                                    <div className="lb">
                                        ◆◆◆◆
                                    </div>
                                    <div className="non-lb">
                                    </div>
                                    <input type="checkbox" defaultChecked={true} onClick={() => rarityCheckBoxHandler(1, 4)} />
                                </div>
                                <div className="checkbox-container">
                                    <div className="lb">
                                        ◆◆◆
                                    </div>
                                    <div className="non-lb">
                                        ◆
                                    </div>
                                    <input type="checkbox" defaultChecked={true} onClick={() => rarityCheckBoxHandler(1, 3)} />
                                </div>
                                <div className="checkbox-container">
                                    <div className="lb">
                                        ◆◆
                                    </div>
                                    <div className="non-lb">
                                        ◆◆
                                    </div>
                                    <input type="checkbox" defaultChecked={true} onClick={() => rarityCheckBoxHandler(1, 2)} />
                                </div>
                                <div className="checkbox-container">
                                    <div className="lb">
                                        ◆
                                    </div>
                                    <div className="non-lb">
                                        ◆◆◆
                                    </div>
                                    <input type="checkbox" defaultChecked={true} onClick={() => rarityCheckBoxHandler(1, 1)} />
                                </div>
                                <div className="checkbox-container">
                                    <div className="lb">
                                    </div>
                                    <div className="non-lb">
                                        ◆◆◆◆
                                    </div>
                                    <input type="checkbox" defaultChecked={true} onClick={() => rarityCheckBoxHandler(1, 0)} />
                                </div>
                            </div>
                        </div>
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
                                    return (
                                    <SupportCards 
                                        imgUrl={`/cardImages/support_card_s_${card.id}.png`} 
                                        alt={`${card.id}`} 
                                        key={`${card.id}-${card.limit_break}`}  
                                    />)
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