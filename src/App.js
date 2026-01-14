import { Routes, Route, HashRouter } from "react-router-dom";
import MainPage from "./main-page/MainPage.tsx";
import AccountPage from "./account-page/accountPage.tsx";
import "./styles/netflixRecom.scss";
import { LoginContextProvider } from "./utilities/contexts.tsx";

export default function App() {
    return (
        <div className="App">
            <LoginContextProvider>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/account-page" element={<AccountPage />}/>
                    </Routes>
                </HashRouter>
            </LoginContextProvider>
        </div>
    )
};