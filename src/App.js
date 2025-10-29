import "./netflixRecom.scss";
import { useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import { NetflixShow } from "./netflixShow.tsx";
import { sampleData } from "./utilities/constants.tsx";
import LanguageModel from "./LanguageModel.tsx";
import { Dropdown } from "./shared/dropdown.tsx";
import { genresList } from "./utilities/constants.tsx";

function App() {
  const [ loading, setLoading] = useState(false);
  const { register, getValues } = useForm();
  const [showsArray, setShowsArray] = useState(sampleData);
  const [searchGenre, setSearchGenre] = useState("");

  function onChangeHandler() {
    setSearchGenre(getValues("genres"));
    console.log("Selected genre:", getValues("genres"));
  }

  async function onClickHandler() {
    setLoading(true);
    const result = await LanguageModel(getValues("searchbar"), setLoading);
    
    if (result) {
      setShowsArray(result);
    } 
  }

  return (
    <div className="App">
      <h1>
        Welcome to testing site, where we do tests.
      </h1>

      <h3 className="header">These are the top shows on netflix RIGHT NOW!</h3>

      {loading ?
          <div> Loading</div>
          : (
            showsArray.map((show, showNumber) => {
                return <NetflixShow key={showNumber} showData={show} showNumber={showNumber}/>
              }
            )
        )
      }
      <FormProvider {...{ register, getValues }}>
        <form name="test-form" onSubmit={(e) => e.preventDefault()}>
          <div className="search-header">Would you like to search using AI results?</div>
          <button type="submit" value="submit" onClick={() => onClickHandler()} > 
            Submit 
          </button>

          <div className="search-header">Would you like to narrow down by genre?</div>
          <Dropdown genres={genresList} onChangeHandler={onChangeHandler} register={() => register("genres")} />
          <div className="search-header">Or search by your own keywords:</div>
          <input type="text" className="searchbar" {...register("searchbar")} />
          <button type="submit" value="submit" > 
            Submit 
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

export default App;
