import { FC, useState, useMemo, useEffect, useContext, useCallback } from "react";
import Header from "../shared/header/header";
import Footer from "../shared/footer/footer";
import { View, Text, TextInput, Button, Dimensions } from "react-native";
import { NetflixShowData, UserSettings } from "../utilities/interfaces";
import { defaultUserSettings, genresList, sampleData } from "../utilities/constants";
import NetflixShow from "./netflixShows/netflixShow";
import { LanguageModel, LanguageModelSearch } from "../shared/api-calls/LanguageModel";
import { FormProvider, useForm } from 'react-hook-form';
import GenreDropdown from "../shared/genreDropdown";
import { getAccountSettingsRequest } from "../shared/api-calls/apiCalls";
import { LoginContext, LoginContextType } from "../utilities/contexts";

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

      const windowsHeight = Dimensions.get('window').height;

    return ( 
        <View style={{ height: "100%", display: "flex", flexDirection: "column", minHeight: windowsHeight }} >
            <Header setMenuOpen={setMenuOpen} setModalOpen={setModalOpen} showSlideinButton={true} />

            <View style={{ marginTop: 60, paddingBottom: 12, flex: 1 }} >
                <Text style={{ fontSize: 20, color: "red", fontWeight: "bold" }}>
                    These are the top shows on netflix RIGHT NOW!
                </Text>
                {isStockData && 
                    <Text style={{ marginBottom: 4, fontSize: 14, color: "black", fontWeight: "bold", fontStyle: "italic" }}>
                        *This is stock data, please search by keyword or genre to get real data.
                    </Text>
                }

                <View style={{ display: "flex", alignItems: "center", maxWidth: 1366, marginTop: 0, marginBottom: 0, marginLeft: "auto", marginRight: "auto" }}>
                    <View style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                        {loading ?
                        <View className="lds-dual-ring"/>
                        : errorMessage !== "" ? (
                            <Text style={{ fontSize: 14, color: "red" }}>{errorMessage}</Text>
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
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={{ minWidth: "auto", textAlign: "right", marginTop: 24, marginBottom: 10, marginRight: 16, color: "blue", fontWeight: "bold", fontSize: 16, flexGrow: 3, flexShrink: 1 }}>
                        Would you like to search using AI results and below genre filter?
                      </Text>
                      <View style={{ minWidth: "auto", flex: 2, display: "flex", alignItems: "flex-end", marginBottom: 8, marginRight: 8, justifyContent: "center" }}>
                        <Button title="Submit" onPress={() => searchByGenre()} disabled={loading} /> 
                      </View>
                    </View>

                    <Text style={{ minWidth: "auto", textAlign: "right", marginTop: 24, marginBottom: 10, marginRight: 16, color: "blue", fontWeight: "bold", fontSize: 16 }}>Would you like to narrow down by genre?</Text>
                      <GenreDropdown 
                        selectedGenre={selectedGenre} 
                        genres={genresList} 
                        onChangeHandler={onChangeHandler} 
                        register={() => register("genres")} 
                      />
                    <Text style={{ minWidth: "auto", textAlign: "right", marginTop: 24, marginBottom: 10, marginRight: 16, color: "blue", fontWeight: "bold", fontSize: 16 }}> 
                      <View style={{ flexDirection:'row', flexWrap:'wrap'} }>Or search by your own keywords: </View>
                    </Text>
                    <TextInput style={{ minWidth: "auto", marginRight: 10 }} {...register("searchbar")} editable={loading} />
                    <View style={{ marginLeft: "33%", width: "33%", marginBottom: 8, justifyContent: "center" }}>
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