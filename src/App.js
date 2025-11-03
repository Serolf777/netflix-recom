import "./styles/netflixRecom.scss";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import { NetflixShow } from "./netflixShow.tsx";
import { sampleData } from "./utilities/constants.tsx";
import { LanguageModel, LanguageModelSearch } from "./LanguageModel.tsx";
import { Dropdown } from "./shared/dropdown.tsx";
import { genresList } from "./utilities/constants.tsx";
import { Header } from "./header/header.tsx";

function App() {
  const [ loading, setLoading] = useState(false);
  const { register, getValues } = useForm();
  const [showsArray, setShowsArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  function onChangeHandler() {
    console.log("Selected genre:", getValues("genres"));
  }

  useEffect(() => {
    setShowsArray(sampleData);
  }, [sampleData]);

  async function searchByGenre() {
    setErrorMessage("");
    setLoading(true);
    const result = await LanguageModel(getValues("genres"), setLoading);
    
    if (result?.error) {
      setErrorMessage(result.error);
    } else if (result) {
      setShowsArray(result);
    }
  }

  async function searchByUserInput() {
    setErrorMessage("");
    setLoading(true);
    const result = await LanguageModelSearch(getValues("searchbar"), setLoading);

    if (result?.error) {
      setErrorMessage(result.error);
    } else if (result) {
      setShowsArray(result);
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="site-body">
        <h3 className="announcement">These are the top shows on netflix RIGHT NOW!</h3>

        {loading ?
            <div className="lds-dual-ring"></div>
            : errorMessage !== "" ? (
              <div className="error-message">{errorMessage}</div>
            ) : (
              showsArray.map((show, showNumber) => {
                  return <NetflixShow key={showNumber} showData={show} showNumber={showNumber}/>
                }
              )
          )
        }
        <FormProvider {...{ register, getValues }}>
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
            <Dropdown genres={genresList} onChangeHandler={onChangeHandler} register={() => register("genres")} />
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

      <div className="footer">
          <div className="footer-text">
            This app is created by Alejandro Flores.
          </div>
        </div>
    </div>
  );
}

export default App;
