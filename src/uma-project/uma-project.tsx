import { FC } from 'react';
import Footer from '../shared/footer/footer.tsx';
import './uma-project.scss';
import { FormProvider, useForm } from 'react-hook-form';
import Dropdown from '../shared/dropdown.tsx';
import { staticUmaList } from '../utilities/constants.tsx';
import Spd from "../shared/resources/Spd.png";
import Stam from "../shared/resources/Stam.png";
import Pow from "../shared/resources/Pow.png";
import Guts from "../shared/resources/Guts.png";
import Wit from "../shared/resources/Wit.png";
import Pal from "../shared/resources/Pal.png";

const UmaProject: FC = () => {
    const methods = useForm();

    function optionSelected(option : string) {
        console.log(`option selected: ${option}`);
    };

    const statTypes = [
        { 
            type: "Speed",
            img: Spd
        },
        { 
            type: "Stamina",
            img: Stam
        },
        { 
            type: "Power",
            img: Pow
        },
        { 
            type: "Guts",
            img: Guts
        },
        { 
            type: "Wits",
            img: Wit
        },
        {
            type: "Pal",
            img: Pal
        }
    ];

    function onClickCardFunction() {
        console.log("card clicked");
    }

    return (
        <div className="uma-project-container">
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
                                            <div className={`stat-card ${statType.type}`} onClick={onClickCardFunction}>
                                                <img src={statType.img} height="50px"/>
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