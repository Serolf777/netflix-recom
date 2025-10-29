import { NetflixShowData } from "./utilities/constants.tsx";
import "./netflixRecom.scss";

type NetflixShowProps = {
    showData: NetflixShowData;
}

export const NetflixShow = ({ showData } : NetflixShowProps) => {
    return (
        <div className="netflixShow">
            <div className="show-image-container">
                <img className="show-image" src={showData.picture} alt={showData.name} height="200" width="200"/>
            </div>
            <div className="show-details">
                <div>{showData.name}.</div>
                <div>{showData.description} </div>
                <div>Genre: {showData.genre} </div>
                <div>Rating: {showData.rating} </div>
                <div><a href={showData.link} target="_blank">Watch Now</a></div>
            </div>
        </div>
    )
}