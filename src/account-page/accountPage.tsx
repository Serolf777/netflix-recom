import { useNavigate } from "react-router";
import Footer from "../shared/footer/footer.tsx";
import "./accountPage.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GenreDropdown from "../shared/genreDropdown.tsx";
import { genresList, numberOfResults } from "../utilities/constants.tsx";
import { FormProvider, useForm } from "react-hook-form";
import Dropdown from "../shared/dropdown.tsx";
import { useState } from "react";
import { getCookies } from "../utilities/utilityFunctions.tsx";
import { saveSettingsRequest } from "../shared/api-calls/apiCalls.tsx";

function AccountPage () {
    const navigate = useNavigate();
    const methods = useForm();
    const [resultNumber, setResultNumber] = useState(numberOfResults[0]);
    const [settingsUpdated, setSettingsUpdated] = useState<null| boolean>(null);
    const [errorUpdating, setErrorUpdating] = useState<null| boolean>(null);
    const [selectedGenre, setSelectedGenre] = useState<string>("");
    const { getValues, register } = methods;
    const cookies = getCookies();

    const saveSettings = async () => {
        let accountUpdated = false;
        const userSettings = {
            Username: cookies["username"],
            NumOfResults: resultNumber,
            DefaultGenre: getValues('genres')
        }

        const json = JSON.stringify(userSettings);

        await saveSettingsRequest(json, accountUpdated, setSettingsUpdated, setErrorUpdating);
    }

    function onNumResultChange(resultNumber: string) {
        setResultNumber(resultNumber);
        console.log("Selected num of results:", resultNumber);
    }

    function onGenreChange() {
        setSelectedGenre(getValues("genres"));
        console.log("Selected genre:", getValues("genres"));
    }

    const updateMessage = errorUpdating ? " Unable to update user settings" : "User settings updated";

    return (
        <div className="account-page">
            <div className="header">
                <div className="go-back" onClick={() => navigate("/")}>
                    <ArrowBackIcon />
                    Main Page
                </div>
            </div>

            {cookies["username"] ?
                <div className="account-content">
                    {settingsUpdated ?
                        <div className="update-message">
                            {updateMessage}
                        </div>
                        :
                        <></>
                    }

                    <div className="account-settings">
                        <div className="account-settings-header">
                            Account Settings
                        </div>
                        <FormProvider { ...methods }>
                            <form className="account-settings-form" onSubmit={(e) => e.preventDefault()}>
                                <div className="results-number">
                                    <Dropdown dropdownOptions={numberOfResults} onChangeHandler={onNumResultChange} disablePrompt={true} />
                                    <div className="input-text">
                                        Number of Results
                                    </div>
                                </div>
                                <div className="default-genre">
                                    <GenreDropdown 
                                        selectedGenre={selectedGenre} 
                                        genres={genresList} 
                                        onChangeHandler={onGenreChange} 
                                        disablePrompt={true} register={() => register("genres")}
                                    />
                                    <div className="input-text">
                                        Default Genre
                                    </div>
                                </div>
                                <div className="submit-button">
                                    <button type="submit" value="submit" onClick={() => saveSettings()}> 
                                        Save Settings 
                                    </button>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>
                :
                <div>
                    Please login in order to update your settings.
                </div>

            }
            <Footer />
        </div>
    )
};

export default AccountPage;