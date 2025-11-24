import { useNavigate } from "react-router";
import Footer from "./footer/footer.tsx";
import "./styles/netflixRecom.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function AccountPage () {
    const navigate = useNavigate();

    return (
        <div className="account-page">
            <div className="header">
                <div className="go-back" onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                    Go back.
                </div>
            </div>
            <div className="account-content"> 
                Account Page!
            </div>
            <Footer />
        </div>
    )
};

export default AccountPage;