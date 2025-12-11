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
            picture: { type: "string" },
        },
        required: ["ranking", "name", "rating", "link", "genre", "description", "picture"],
    },
    required: ["shows"],
};

export const ChatbotResponse = {
    "type": "object",
    "properties": {
        "response": { "type": "string" },
    },
    "required": ["response"],
};

export const ErrorData = {
    type: "object",
    properties: {
        error: { type: "string" },
    },
    required: ["error"],
};
