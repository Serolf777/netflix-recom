import { FC } from 'react';
import { NumberToStat } from '../utilities/constants.tsx';

export interface SupportCardsProps {
    imgUrl: string;
    limitBreak: number;
    statType: number;
    alt: string;
    cardClicked: () => void;
};

const SupportCards: FC<SupportCardsProps> = ({ imgUrl, limitBreak, statType, alt, cardClicked }) => {
    let limitBreakString = "";
    let nonLimitBreakString = "";

    for (let n = 0; n < limitBreak; n++) {
        limitBreakString = limitBreakString + "◆";
    }

    for (let y = limitBreakString.length; y < 4; y++) {
        nonLimitBreakString = nonLimitBreakString + "◆";
    }

    let stat = (NumberToStat as Record<number, string>)[statType];

    return (
        <div className="support-card" onClick={cardClicked}>
            <img src={imgUrl} alt={alt} height={100} />
            <div className="limit-break">
                <div className="lb">
                    {limitBreakString}
                </div>
                <div className="non-lb">
                    {nonLimitBreakString}
                </div>
            </div>
            <img 
                src={`/statImages/${stat}.png`} 
                className={`stat-type ${stat}`} 
                alt={`stat-type ${stat}`} 
                height={25} 
            />
        </div>
    )
};

export default SupportCards;