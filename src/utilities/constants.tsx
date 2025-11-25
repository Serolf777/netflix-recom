export const sampleData = [
    { 
        ranking: 1, 
        name: "Action Show", 
        rating: 8.5,
        link: "https://www.netflix.com/title/123456",
        genre: "Action",
        description: "An action-packed show",
        picture: "https://images.pexels.com/photos/6295753/pexels-photo-6295753.jpeg"
    },
    { 
        ranking: 2, 
        name: "Comedy Show",
        rating: 8.0,
        link: "https://www.netflix.com/title/123457",
        genre: "Comedy",
        description: "A hilarious comedy show",
        picture: "https://images.pexels.com/photos/4746228/pexels-photo-4746228.jpeg"
    },
    { 
        ranking: 3, 
        name: "Drama Show",
        rating: 7.0,
        link: "https://www.netflix.com/title/123458",
        genre: "Drama",
        description: "A gripping drama series",
        picture: "https://images.pexels.com/photos/34403059/pexels-photo-34403059.jpeg"
    },
];

export const genresList = [
    "All",
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Sci-Fi"
];

export const numberOfResults = [
    "1",
    "2",
    "3",
    "4",
    "5",
];

export const coolPokemonList = [
    "Bulbasaur",
    "Squirtle",
    "Charmander",
    "Pikachu"
];

export const rateTheSite = [
    "Amazing!",
    "Great!",
    "Could be better...",
    "Terrible! Awful!"
];

export interface NetflixShowData {
    ranking: number;
    name: string;
    rating: number;
    link: string;
    genre: string;
    description: string;
    picture: string;
};