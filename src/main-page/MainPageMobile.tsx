import { FC, useState, useMemo, useEffect, useContext, useCallback } from "react";
import Header from "../shared/header/header";
import Footer from "../shared/footer/footer";
import { View, Text, TextInput, Button } from "react-native";
import { NetflixShowData, UserSettings } from "../utilities/interfaces";
import { defaultUserSettings, genresList, sampleData } from "../utilities/constants";
import NetflixShow from "./netflixShows/netflixShow";
import { LanguageModel, LanguageModelSearch } from "../shared/api-calls/LanguageModel";
import { FormProvider, useForm } from 'react-hook-form';
import GenreDropdown from "../shared/genreDropdown";
import { getAccountSettingsRequest } from "../shared/api-calls/apiCalls";
import { LoginContext, LoginContextType } from "../utilities/contexts";
import { mainPageStyles } from "./styles/mobileStyles";
import Loader from "./Loader";

export const MainPageMobile: FC = () => { 
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [isStockData, setIsStockData] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showsArray, setShowsArray] = useState<NetflixShowData[]>(sampleData);
    const [accountSettings, setAccountSettings] = useState<UserSettings>(defaultUserSettings);
    const [selectedGenre, setSelectedGenre] = useState<string>("");
    const methods = useForm();
    const { register, getValues } = methods;
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
        <View style={mainPageStyles.mainPageContainer} >
            <Header setMenuOpen={setMenuOpen} setModalOpen={setModalOpen} showSlideinButton={true} />

            <View style={mainPageStyles.siteBody} >
                <Text style={mainPageStyles.announcement}>
                    These are the top shows on netflix RIGHT NOW!
                </Text>
                {isStockData && 
                    <Text style={mainPageStyles.stockDataNote}>
                        *This is stock data, please search by keyword or genre to get real data.
                    </Text>
                }

                <View style={mainPageStyles.netflixShowsContainer}>
                    <View style={mainPageStyles.netFlixShowsList}>
                        {loading ?
                        <Loader />
                        : errorMessage !== "" ? (
                            <Text style={mainPageStyles.errorMsg}>{errorMessage}</Text>
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

                <FormProvider { ...methods }>
                  <form name="test-form" className="netflix-form" onSubmit={(e) => e.preventDefault()}>
                    <View style={mainPageStyles.aiSearchSection}>
                      <Text style={mainPageStyles.searchHeader}>
                        Would you like to search using AI results and below genre filter?
                      </Text>
                      <View style={mainPageStyles.buttonContainer}>
                        <Button title="Submit" onPress={() => searchByGenre()} disabled={loading} /> 
                      </View>
                    </View>

                    <Text style={mainPageStyles.searchHeader}>Would you like to narrow down by genre?</Text>
                      <GenreDropdown 
                        selectedGenre={selectedGenre} 
                        genres={genresList} 
                        onChangeHandler={onChangeHandler} 
                        register={() => register("genres")} 
                      />
                    <Text style={mainPageStyles.searchHeader}> 
                      <View style={mainPageStyles.searchBy}>Or search by your own keywords: </View>
                    </Text>
                    <TextInput style={mainPageStyles.searchbar} {...register("searchbar")} editable={loading} />
                    <View style={mainPageStyles.submitButtonContainer}>
                      <Button title="Submit" onPress={() => searchByUserInput()} disabled={loading} />
                    </View>
                </form>
              </FormProvider>
            </View>

            <Footer />
        </View>
    )
};

export default MainPageMobile;