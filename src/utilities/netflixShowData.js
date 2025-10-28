export const NetflixShowData = {
    type: "array",
    shows: {
        type: "object",
        properties: {
            ranking: { type: "number" },
            name: { type: "string" },
            rating: { type: "integer" },
            link: { type: "string" },
            genre: { type: "string" },
            description: { type: "string" },
        },
        required: ["ranking", "name", "rating", "link", "genre", "description"],
    },
    required: ["shows"],
};