import { Routes, Route } from "react-router";
import MainPage from "./main-page/MainPage.tsx";
import AccountPage from "./account-page/accountPage.tsx";
import "./styles/netflixRecom.scss";
import { LoginContextProvider } from "./utilities/contexts.tsx";
import UmaProject from "./uma-project/uma-project.tsx";

export default function App() {
    return (
        <div className="App">
            <LoginContextProvider>
                <Routes>
                    <Route exact path="/" element={<MainPage />} />
                    <Route exact path="/account-page" element={<AccountPage />}/>
                    <Route exact path="/uma-project" element={<UmaProject />} />
                </Routes>
            </LoginContextProvider>
        </div>
    )
};