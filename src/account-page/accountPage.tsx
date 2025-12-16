import { useNavigate } from "react-router";
import Footer from "../shared/footer/footer.tsx";
import "./accountPage.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GenreDropdown from "../shared/genreDropdown.tsx";
import { defaultUserSettings, genresList, numberOfResults } from "../utilities/constants.tsx";
import { FormProvider, useForm } from "react-hook-form";
import Dropdown from "../shared/dropdown.tsx";
import { useCallback, useContext, useEffect, useState } from "react";
import { getAccountSettingsRequest, saveSettingsRequest } from "../shared/api-calls/apiCalls.tsx";
import { UserSettings } from "../utilities/interfaces";
import Header from "../shared/header/header.tsx";
import { LoginContext, LoginContextType } from "../utilities/contexts.tsx";

function AccountPage () {
    const navigate = useNavigate();
    const methods = useForm();
    const [settingsUpdated, setSettingsUpdated] = useState<null| boolean>(null);
    const [errorUpdating, setErrorUpdating] = useState<null| boolean>(null);
    const [accountSettings, setAccountSettings] = useState<UserSettings>(defaultUserSettings);
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const { getValues, register } = methods;
    const { username } = useContext(LoginContext) as LoginContextType;

    const saveSettings = async () => {
        let accountUpdated = false;
        const userSettings = {
            Username: username,
            NumOfResults: accountSettings.NumberOfResults,
            DefaultGenre: accountSettings.DefaultGenre
        }

        const json = JSON.stringify(userSettings);

        await saveSettingsRequest(json, accountUpdated, setSettingsUpdated, setErrorUpdating);
    }

    function onNumResultChange(resultNumber: string) {
        setAccountSettings({ ...accountSettings, NumberOfResults: resultNumber });
        console.log("Selected num of results:", resultNumber);
    }

    function onGenreChange() {
        setAccountSettings({ ...accountSettings, DefaultGenre: getValues("genres") })
        console.log("Selected genre:", getValues("genres"));
    }

    const fetchData = useCallback(async () => {
        await getAccountSettingsRequest(username, setAccountSettings);
      }, [username]);
    
    useEffect(() => {
        fetchData().catch(console.error);
    }, [username]);

    const updateMessage = errorUpdating ? " Unable to update user settings" : "User settings updated";

    return (
        <div className="account-page">
            <Header setMenuOpen={setMenuOpen} setModalOpen={setModalOpen}/>

            <div className="account-page-header">
                <div className="go-back" onClick={() => navigate("/")}>
                    <ArrowBackIcon />
                    Main Page
                </div>
            </div>

            {username ?
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
                        <div className="account-settings-subheader"> 
                            Update your account settings below and then click "Save Settings".
                        </div>

                        <FormProvider { ...methods }>
                            <form className="account-settings-form" onSubmit={(e) => e.preventDefault()}>
                                <div className="results-number">
                                    <Dropdown 
                                        defaultOption={accountSettings.NumberOfResults} 
                                        dropdownOptions={numberOfResults} 
                                        onChangeHandler={onNumResultChange} 
                                        disablePrompt={true} 
                                    />
                                    <div className="input-text">
                                        Number of Results
                                    </div>
                                </div>
                                <div className="default-genre">
                                    <GenreDropdown 
                                        selectedGenre={accountSettings.DefaultGenre} 
                                        genres={genresList} 
                                        onChangeHandler={onGenreChange} 
                                        disablePrompt={true} register={() => register("genres")}
                                    />
                                    <div className="input-text">
                                        Default Genre
                                    </div>
                                </div>
                                <div className="divider" />
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
                <div className="login-notification-content">
                    <div className="login-notification">
                        Please login in order to update your settings.
                    </div>
                </div>

            }
            <Footer />
        </div>
    )
};

export default AccountPage;