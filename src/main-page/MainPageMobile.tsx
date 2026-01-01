import { FC, useState, useMemo } from "react";
import Header from "../shared/header/header";
import Footer from "../shared/footer/footer";
import { View } from "react-native";
import { NetflixShowData, UserSettings } from "../utilities/interfaces";
import { defaultUserSettings, sampleData } from "../utilities/constants";
import NetflixShow from "./netflixShows/netflixShow";
import { LanguageModel, LanguageModelSearch } from "../shared/api-calls/LanguageModel";
import "./mainPage.scss"

export const MainPageMobile: FC = () => { 
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [isStockData, setIsStockData] = useState(true);
    const [ loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showsArray, setShowsArray] = useState<NetflixShowData[]>(sampleData);
    const [accountSettings, setAccountSettings] = useState<UserSettings>(defaultUserSettings);

    function onChangeHandler() {
        console.log("test");
    }

    function loadingData() {
        setErrorMessage("");
        setLoading(true);
        setIsStockData(false);
    }

    async function searchByGenre() {
        loadingData();
        const result = await LanguageModel("placeholder", setLoading);
        
        if (result?.error) {
          setErrorMessage(result.error);
        } else if (result) {
          setShowsArray(result);
        }
      }

    async function searchByUserInput() {
        loadingData();
        const result = await LanguageModelSearch("placeholder", setLoading);
    
        if (result?.error) {
          setErrorMessage(result.error);
        } else if (result) {
          setShowsArray(result);
        }
    }

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
        <View className="main-page"> 
            <Header setMenuOpen={setMenuOpen} setModalOpen={setModalOpen} showSlideinButton={true} />

            <View className="site-body">
                <View className={"announcement"}>
                    These are the top shows on netflix RIGHT NOW!
                </View>
                {isStockData && 
                    <View className="stockdata-note">
                        *This is stock data, please search by keyword or genre to get real data.
                    </View>
                }

                <View className="netflix-shows-container">
                    <View className="netflix-shows-list">
                        {loading ?
                        <View className="lds-dual-ring"/>
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
                        <View>
                            No results
                        </View>
                        }
                    </View>
                </View>
            </View>

            <Footer />
        </View>
    )
};

export default MainPageMobile;