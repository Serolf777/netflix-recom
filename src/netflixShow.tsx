import { NetflixShowData } from "./utilities/constants.tsx";
import "./netflixRecom.scss";

type NetflixShowProps = {
    showData: NetflixShowData;
}

export const NetflixShow = ({ showData } : NetflixShowProps) => {
    return (
        <div className="netflixShow">
            <div>{showData.name}.</div>
            <div>{showData.description} </div>
            <div>Genre: {showData.genre} </div>
            <div>Rating: {showData.rating} </div>
            <div><a href={showData.link} target="_blank">Watch Now</a></div>
        </div>
    )
}