import { Routes, Route } from "react-router";
import MainPage from "./main-page/MainPage.tsx";
import AccountPage from "./account-page/accountPage.tsx";
import "./styles/netflixRecom.scss";

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<MainPage />} />
                <Route exact path="/account-page" element={<AccountPage />}/>
            </Routes>
        </div>
    )
};