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

export async function LLMnetflixQuerySearch(search: string) {
    try {
        const data = await fetch(`http://localhost:8080/userSearch?search=${search}`)
            .then(res => 
                res.json()
            );
        return data;
    } catch (error) {
        console.error("Error querying the language model:", error);
    }
}

export async function LanguageModel(genre : string, setLoading: (loading: boolean) => VoidFunction) {
    const result = await LLMnetflixQuery(genre).finally(() => setLoading(false));

    console.log("Language model result:", result);

    if (result?.error) {
        return { error: result.error };
    }
    
    return result?.shows;
}

export async function LanguageModelSearch(search: string, setLoading: (loading: boolean) => VoidFunction) {
    const result = await LLMnetflixQuerySearch(search).finally(() => setLoading(false));

    console.log("Language model result:", result);

    if (result?.error) {
        return { error: result.error };
    }
    
    return result?.shows;
}