import { netflixShowData } from "./netflixShowData";
import "./netflixRecom.scss";

type NetflixShowProps = {
    showData: netflixShowData;
}

export const NetflixShow = ({ showData } : NetflixShowProps) => {
    return (
        <div className="netflixShow">
            <div>This will be a {showData.showName}.</div>
            <div>This will contain show data {showData.showData} </div>
        </div>
    )
}