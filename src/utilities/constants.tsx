export const sampleData = [
    { showName: "coolShow1", showData: "coolShow 1"},
    { showName: "coolShow2", showData: "coolShow 2"},
    { showName: "coolShow3", showData: "coolShow 3"},
]

export const NetflixShowData = {
    type: "object",
    properties: {
        ranking: { type: "number" },
        name: { type: "string" },
        data: { type: "string" },
        genre: { type: "string" },
        description: { type: "string" },
    },
    required: ["ranking", "name", "data", "genre", "description"],
};