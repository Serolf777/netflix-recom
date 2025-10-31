import "./styles/netflixRecom.scss";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import { NetflixShow } from "./netflixShow.tsx";
import { sampleData } from "./utilities/constants.tsx";
import LanguageModel from "./LanguageModel.tsx";
import { Dropdown } from "./shared/dropdown.tsx";
import { genresList } from "./utilities/constants.tsx";
import { Header } from "./header/header.tsx";

function App() {
  const [ loading, setLoading] = useState(false);
  const { register, getValues } = useForm();
  const [showsArray, setShowsArray] = useState([]);

  function onChangeHandler() {
    console.log("Selected genre:", getValues("genres"));
  }

  useEffect(() => {
    setShowsArray(sampleData);
  }, [sampleData]);

  async function onClickHandler() {
    setLoading(true);
    const result = await LanguageModel(getValues("genres"), setLoading);
    
    if (result) {
      setShowsArray(result);
    } 
  }

  return (
    <div className="App">
      <Header />
      <div className="site-body">
        <h3 className="announcement">These are the top shows on netflix RIGHT NOW!</h3>

        {loading ?
            <div class="lds-dual-ring"></div>
            : (
              showsArray.map((show, showNumber) => {
                  return <NetflixShow key={showNumber} showData={show} showNumber={showNumber}/>
                }
              )
          )
        }
        <FormProvider {...{ register, getValues }}>
          <form name="test-form" className="netflix-form" onSubmit={(e) => e.preventDefault()}>
            <div className="ai-search-section">
              <div className="search-header">Would you like to search using AI results?</div>
              <div className="button-container">
                <button type="submit" value="submit" onClick={() => onClickHandler()} > 
                  Submit 
                </button>
              </div>
            </div>

            <div className="search-header">Would you like to narrow down by genre?</div>
            <Dropdown genres={genresList} onChangeHandler={onChangeHandler} register={() => register("genres")} />
            <div className="search-header"> 
              <div className="searchby">Or search by your own keywords: </div>
              <div className="in-progress">(In progress)</div>
            </div>
            <input type="text" className="searchbar" {...register("searchbar")} disabled={true}/>
            <button type="submit" value="submit" disabled={true}> 
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
