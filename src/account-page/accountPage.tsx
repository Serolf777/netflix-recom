import { useNavigate } from "react-router";
import Footer from "../shared/footer/footer.tsx";
import "./accountPage.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GenreDropdown from "../shared/genreDropdown.tsx";
import { genresList, numberOfResults } from "../utilities/constants.tsx";
import { FormProvider, useForm } from "react-hook-form";
import Dropdown from "../shared/dropdown.tsx";

function AccountPage () {
    const navigate = useNavigate();
    const methods = useForm();
    const { getValues, register } = methods;

    function onSubmitHandler() {
        console.log("submit pressed")
    }

    function onNumResultChange(resultNumber: string) {
        console.log("Selected num of results:", resultNumber);
    }

    function onGenreChange() {
        console.log("Selected genre:", getValues("genres"));
    }

    return (
        <div className="account-page">
            <div className="header">
                <div className="go-back" onClick={() => navigate("/")}>
                    <ArrowBackIcon />
                    Main Page
                </div>
            </div>
            <div className="account-content"> 
                <div className="account-settings">
                    <FormProvider { ...methods }>
                        <form className="account-settings-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="results-number">
                                <Dropdown dropdownOptions={numberOfResults} onChangeHandler={onNumResultChange} disablePrompt={true} />
                                <div className="input-text">
                                    Number of Results
                                </div>
                            </div>
                            <div className="default-genre">
                                <GenreDropdown genres={genresList} onChangeHandler={onGenreChange} disablePrompt={true} register={() => register("genres")}/>
                                <div className="input-text">
                                    Default Genre
                                </div>
                            </div>
                            <div className="submit-button">
                                <button type="submit" value="submit" onClick={() => onSubmitHandler()}> 
                                    Submit 
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default AccountPage;