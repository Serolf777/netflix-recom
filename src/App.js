import { useEffect, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import NetflixShow from "./netflixShow.tsx";
import { sampleData } from "./utilities/constants.tsx";
import { LanguageModel, LanguageModelSearch } from "./LanguageModel.tsx";
import Dropdown from "./shared/dropdown.tsx";
import { genresList, coolPokemonList, rateTheSite } from "./utilities/constants.tsx";
import Header from "./header/header.tsx";
import classNames from "classnames";
import Modal from './shared/modals/modal.tsx'
import Signin from "./shared/signin.tsx";
import SlideinModal from './shared/modals/slideinModal.tsx'
import { isMobile } from "./shared/isMobile.tsx";
import Register from "./shared/register.tsx";
import GenreDropdown from "./shared/genreDropdown.tsx";

function App() {
  const [ loading, setLoading] = useState(false);
  const { register, getValues } = useForm();
  const [showsArray, setShowsArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSlidein, setShowSlidein] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const mobile = isMobile();

  function onChangeHandler() {
    console.log("Selected genre:", getValues("genres"));
  }

  function slideInOptionSelected(option) {
    console.log(`option selected: ${option}`)
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

  function registerClicked() {
    setShowModal(false);
    setRegisterModalOpen(true);
  }

  return (
    <div className={classNames("App", {
      ["modal-open"] : showModal
    })}>
      <Header modalOpen={showModal} toggleModal={setShowModal} toggleSlidein={setShowSlidein}/>
      <div className="site-body">

      <h3 className={classNames("announcement", {
        ["mobile"] : mobile
      })}>
        These are the top shows on netflix RIGHT NOW!
      </h3>

      {loading ?
          <div className="lds-dual-ring"/>
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
            <GenreDropdown genres={genresList} onChangeHandler={onChangeHandler} register={() => register("genres")} />
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
        
      <Modal modalOpen={showModal} toggleModal={setShowModal}>
        <Signin submitClicked={() => setShowModal(false)} registerClicked={registerClicked}/> 
      </Modal>

      <Modal modalOpen={registerModalOpen} toggleModal={setRegisterModalOpen}>
        <Register toggleSignin={setRegisterModalOpen} />
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
    </div>
  );
}

export default App;
