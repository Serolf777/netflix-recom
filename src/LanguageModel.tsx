//Will eventually take in data and use it to query the language model
//For now, just simulating a fetch request to the server
export async function LLMnetflixQuery(genre: string = "All") {
    try {
        const data = await fetch(`http://localhost:8080/data/${genre}`)
            .then(res => 
                res.json()
            );
        return data;
    } catch (error) {
        console.error("Error querying the language model:", error);
    }
}

export default async function LanguageModel(genre : string, setLoading: (loading: boolean) => VoidFunction) {
    const result = await LLMnetflixQuery(genre).finally(() => setLoading(false));

    console.log("Language model result:", result);
    
    return result?.shows;
}