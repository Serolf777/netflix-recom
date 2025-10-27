import "./netflixRecom.scss";
import { useMemo, useState } from "react";
import { useForm } from 'react-hook-form';
import { NetflixShow } from "./netflixShow.tsx";
import { sampleData } from "./utilities/constants.tsx";
//TODO: implement the language model for data rather than using consts 
//import LanguageModel from "./LanguageModel.tsx";

function App() {
  const [ loading, setLoading] = useState(false);
  const { register, getValues } = useForm();

  function onChangeHandler() {
    //track users changes to "searchbar" value to give recommendations
  }

  function onClickHandler() {
    setLoading(true);
    setTimeout(() => { 
        console.log(getValues("searchbar")) 
        setLoading(false);
      }, 300);
  }

  let showArray = useMemo(() => {
    return sampleData;
  }, [])

  return (
    <div className="App">
      <h1>
        Welcome to testing site, where we do tests.
      </h1>

      <h3 className="header">These are the top shows on netflix RIGHT NOW!</h3>

      {loading ?
          <div> Loading</div>
          : (
            showArray.map((show, showNumber) => {
                return <NetflixShow key={showNumber} showData={show} showNumber={showNumber}/>
              }
            )
        )
      }

      <form name="test-form" onSubmit={(e) => e.preventDefault()}>
        <div className="search-header">Would you like to search for different results?</div>

        <input type="text" className="searchbar" {...register("searchbar")} />
        <button
          type="submit"
          value="submit"
          onClick={() => onClickHandler()}
        > Submit </button>
      </form>
    </div>
  );
}

export default App;
