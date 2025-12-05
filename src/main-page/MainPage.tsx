import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import NetflixShow from "../netflixShow.tsx";
import { LanguageModel, LanguageModelSearch } from "../shared/api-calls/LanguageModel.tsx";
import Dropdown from "../shared/dropdown.tsx";
import { sampleData, genresList, coolPokemonList, rateTheSite, defaultUserSettings } from "../utilities/constants.tsx";
import { NetflixShowData, UserSettings } from "../utilities/interfaces";
import Header from "../shared/header/header.tsx";
import classNames from "classnames";
import Modal from '../shared/modals/modal.tsx'
import Signin from "../shared/signin.tsx";
import SlideinModal from '../shared/modals/slideinModal.tsx'
import { isMobile } from "../shared/isMobile.tsx";
import Register from "../shared/register.tsx";
import GenreDropdown from "../shared/genreDropdown.tsx";
import Footer from "../shared/footer/footer.tsx";
import { getCookies } from "../utilities/utilityFunctions.tsx";
import ChatBot from "../shared/chat-bot/chatBot.tsx";
import { getAccountSettingsRequest } from "../shared/api-calls/apiCalls.tsx";
import "./mainPage.scss"

function MainPage() {
  const [ loading, setLoading] = useState(false);
  const methods = useForm();
  const { register, getValues } = methods;
  const [showsArray, setShowsArray] = useState<NetflixShowData[]>(sampleData);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [showSlidein, setShowSlidein] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [isStockData, setIsStockData] = useState(true);
  const [accountSettings, setAccountSettings] = useState<UserSettings>(defaultUserSettings);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [numberOfResults, setNumberOfResults] = useState<number>(parseInt(defaultUserSettings.NumberOfResults));
  const [chatBotOpen, setChatBotOpen] = useState<boolean>(false);
  const mobile = isMobile();
  const cookies = getCookies();

  function onChangeHandler() {
    setSelectedGenre(getValues("genres"));
    console.log("Selected genre:", getValues("genres"));
  }

  function slideInOptionSelected(option : string) {
    console.log(`option selected: ${option}`)
  }

  function loadingData() {
    setErrorMessage("");
    setLoading(true);
    setIsStockData(false);
  }

  async function searchByGenre() {
    loadingData();
    const result = await LanguageModel(getValues("genres"), setLoading);
    
    if (result?.error) {
      setErrorMessage(result.error);
    } else if (result) {
      setShowsArray(result);
    }
  }

  async function searchByUserInput() {
    loadingData();
    const result = await LanguageModelSearch(getValues("searchbar"), setLoading);

    if (result?.error) {
      setErrorMessage(result.error);
    } else if (result) {
      setShowsArray(result);
    }
  }

  function registerClicked() {
    setShowSigninModal(false);
    setRegisterModalOpen(true);
  }

  const fetchData = useCallback(async () => {
    await getAccountSettingsRequest(cookies, setAccountSettings);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [cookies["username"]]);

  useEffect(() => {
    setSelectedGenre(accountSettings.DefaultGenre);
    setNumberOfResults(parseInt(accountSettings.NumberOfResults));
  }, [accountSettings]);

  return (
    <div className={classNames("main-page", {
      ["modal-open"] : showSigninModal
    })}>
      <Header modalOpen={showSigninModal} toggleModal={setShowSigninModal} toggleSlidein={setShowSlidein}/>
      <div className="site-body">

      <h3 className={classNames("announcement", {
        ["mobile"] : mobile
      })}>
        These are the top shows on netflix RIGHT NOW!
      </h3>
      {isStockData && 
        <div className="stockdata-note">
          *This is stock data, please search by keyword or genre to get real data.
        </div>
      }

      <div className="netflix-shows-container">
        <div className="netflix-shows-list">
          {loading ?
              <div className="lds-dual-ring"/>
              : errorMessage !== "" ? (
                  <div className="error-message">{errorMessage}</div>
                ) : (
                  showsArray.filter((show, index) => index < numberOfResults).map((show, showNumber) => {
                      return <NetflixShow key={showNumber} showData={show} />
                    }
                  )
              )
            }
          </div>
        </div>
        
        <div className="divider" />

        <FormProvider { ...methods }>
          <form name="test-form" className="netflix-form" onSubmit={(e) => e.preventDefault()}>
            <div className="ai-search-section">
              <div className="search-header">Would you like to search using AI results and below genre filter?</div>
              <div className="button-container">
                <button type="submit" value="submit" onClick={() => searchByGenre()} disabled={loading}> 
                  Submit 
                </button>
              </div>
            </div>

            <div className="search-header">Would you like to narrow down by genre?</div>
              <GenreDropdown 
                selectedGenre={selectedGenre} 
                genres={genresList} 
                onChangeHandler={onChangeHandler} 
                register={() => register("genres")} 
              />
            <div className="search-header"> 
              <div className="searchby">Or search by your own keywords: </div>
            </div>
            <input type="text" className="searchbar" {...register("searchbar")} disabled={loading} />
            <button type="submit" value="submit" onClick={() => searchByUserInput()} disabled={loading}> 
              Submit 
            </button>
          </form>
        </FormProvider>
      </div>

      <Footer />
        
      <Modal modalOpen={showSigninModal} toggleModal={setShowSigninModal}>
        <Signin submitClicked={() => setShowSigninModal(false)} registerClicked={registerClicked}/> 
      </Modal>

      <Modal modalOpen={registerModalOpen} toggleModal={setRegisterModalOpen}>
        <Register toggleSignin={() => setRegisterModalOpen(false)} />
      </Modal>

      <SlideinModal slideinOpen={showSlidein} toggleSlidein={setShowSlidein}>
        <div>
          <div>Look at this slide in!</div>
          <Dropdown dropdownOptions={genresList} onChangeHandler={slideInOptionSelected}/>
          <Dropdown 
            customPrompt="What's your favorite pokemon?" 
            dropdownOptions={coolPokemonList} 
            onChangeHandler={slideInOptionSelected}
          />
          <Dropdown
            customPrompt="What would you rate this site?"
            dropdownOptions={rateTheSite} 
            onChangeHandler={slideInOptionSelected}
          />
        </div>
      </SlideinModal>

      {!showSigninModal && !registerModalOpen && !showSlidein &&
        <ChatBot open={chatBotOpen} openChatBot={setChatBotOpen} />
      }
    </div>
  );
}

export default MainPage;
