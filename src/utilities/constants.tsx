export const sampleData = [
    { 
        ranking: 1, 
        name: "coolShow1", 
        rating: 8.5,
        link: "https://www.netflix.com/title/123456",
        genre: "Action",
        description: "An action-packed show"
    },
    { 
        ranking: 2, 
        name: "coolShow2",
        rating: 8.0,
        link: "https://www.netflix.com/title/123457",
        genre: "Comedy",
        description: "A hilarious comedy show"
    },
    { 
        ranking: 3, 
        name: "coolShow3",
        rating: 7.0,
        link: "https://www.netflix.com/title/123458",
        genre: "Drama",
        description: "A gripping drama series"
    },
];

export interface NetflixShowData {
    ranking: number;
    name: string;
    rating: number;
    link: string;
    genre: string;
    description: string;
};