import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import NetflixShow from "./netflixShows/netflixShow.tsx";
import { LanguageModel, LanguageModelSearch } from "../shared/api-calls/LanguageModel.tsx";
import { sampleData, genresList, defaultUserSettings } from "../utilities/constants.tsx";
import { NetflixShowData, UserSettings } from "../utilities/interfaces";
import Header from "../shared/header/header.tsx";
import classNames from "classnames";
import { isMobile } from "../shared/isMobile.tsx";
import GenreDropdown from "../shared/genreDropdown.tsx";
import Footer from "../shared/footer/footer.tsx";
import ChatBot from "../shared/chat-bot/chatBot.tsx";
import { getAccountSettingsRequest } from "../shared/api-calls/apiCalls.tsx";
import "./mainPage.scss"
import { LoginContext, LoginContextType } from "../utilities/contexts.tsx";

function MainPage() {
  const [ loading, setLoading] = useState(false);
  const methods = useForm();
  const { register, getValues } = methods;
  const [showsArray, setShowsArray] = useState<NetflixShowData[]>(sampleData);
  const [errorMessage, setErrorMessage] = useState("");
  const [isStockData, setIsStockData] = useState(true);
  const [accountSettings, setAccountSettings] = useState<UserSettings>(defaultUserSettings);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [chatBotOpen, setChatBotOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobile = isMobile();
  const { username } = useContext(LoginContext) as LoginContextType;

  function onChangeHandler() {
    setSelectedGenre(getValues("genres"));
    console.log("Selected genre:", getValues("genres"));
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

  const fetchData = useCallback(async () => {
    await getAccountSettingsRequest(username, setAccountSettings);
  }, [username]);

  useEffect(() => {
    if (username) {
      fetchData().catch(console.error);
    }
    else {
      setAccountSettings(defaultUserSettings);
    }
  }, [username]);

  useEffect(() => {
    setSelectedGenre(accountSettings.DefaultGenre);
  }, [accountSettings]);

  const filteredArray = useMemo(() => {
    const filteredShowsArray: NetflixShowData[] = [];

    for (let i = 0; showsArray.length > i; i++) {
      if (filteredShowsArray.length >= parseInt(accountSettings.NumberOfResults)) {
        break;
      }

      if (accountSettings.DefaultGenre.toLowerCase() == 'all') {
        filteredShowsArray.push(showsArray[i]);
      }
      else if (accountSettings.DefaultGenre.toLowerCase() == showsArray[i].genre.toLowerCase()) {
        filteredShowsArray.push(showsArray[i]);
      }
    }

    return filteredShowsArray;
  }, [showsArray, accountSettings]);

  return (
    <div className="main-page">
      <Header setMenuOpen={setMenuOpen} setModalOpen={setModalOpen} showSlideinButton={true} />

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
                ) : 
                filteredArray.length > 0 ?
                (
                  filteredArray.map((show, showNumber) => {
                      return <NetflixShow key={showNumber} showData={show} />
                    }
                  )
              ) :
              <div>
                No results
              </div>
            }
          </div>
        </div>

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

      {!menuOpen && !modalOpen &&
        <ChatBot open={chatBotOpen} openChatBot={setChatBotOpen} />
      }
    </div>
  );
}

export default MainPage;
