import "./netflixRecom.scss";
import { useMemo, useState } from "react";
import LanguageModel from "./LanguageModel.tsx";
import { NetflixShow } from "./netflixShow.tsx";

function App() {
  const [loading, setLoading] = useState(false);


  function onChangeHandler() {
    //do something with document.forms["test-form"].searchbar.value
  }

  function onClickHandler() {
    setLoading(true);
    LanguageModel(document.forms["test-form"].searchbar.value, setLoading);
  }

  let showArray = useMemo(() => {
    return [
        { showName: "show1", showData: "somethingCool1"}, 
        { showName: "show2", showData: "somethingCool2" }, 
        { showName: "show3", showData: "somethingCool3" }
      ]
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

        <input type="text" name="searchbar" className="searchbar" />
        <button
          type="submit"
          value="submit"
          onChange={onChangeHandler}
          onClick={() => onClickHandler()}
        > Submit </button>
      </form>
    </div>
  );
}

export default App;
