import { FC } from 'react';

export interface SupportCardsProps {
    imgUrl: string;
    alt: string;
};

const SupportCards: FC<SupportCardsProps> = ({ imgUrl, alt }) => {
    return (
        <div className="support-card" >
            <img src={imgUrl} alt={alt} height={100} />
        </div>
    )
};

export default SupportCards;