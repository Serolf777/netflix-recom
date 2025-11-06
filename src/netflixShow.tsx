import { NetflixShowData } from "./utilities/constants.tsx";
import "./styles/netflixRecom.scss";

interface NetflixShowProps {
    showData: NetflixShowData;
}

export const NetflixShow = ({ showData } : NetflixShowProps) => {
    return (
        <div className="netflixShow">
            <div className="show-image-container">
                <img className="show-image" src={showData.picture} alt={showData.name} height="200" width="200"/>
            </div>
            <div className="show-details">
                <div className="show-name">{showData.name}.</div>
                <div className="show-description">{showData.description} </div>
                <div className="show-genre">Genre: {showData.genre} </div>
                <div className="show-rating">Rating: {showData.rating} </div>
                <div className="show-link"><a href={showData.link} target="_blank">Watch Now</a></div>
            </div>
        </div>
    )
}