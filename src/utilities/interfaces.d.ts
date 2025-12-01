export interface NetflixShowData {
    ranking: number;
    name: string;
    rating: number;
    link: string;
    genre: string;
    description: string;
    picture: string;
}

export interface UserSettings {
    NumberOfResults: string;
    DefaultGenre: string;
    Username: string;
}