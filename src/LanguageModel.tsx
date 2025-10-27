//import { LMStudioClient } from "@lmstudio/sdk";
//import { NetflixShowData } from "./utilities/constants.tsx";

export default function LanguageModel(data : string, setLoading: (loading: boolean) => VoidFunction) {
    async function LLMnetflixQuery() {
        try {
            /*
            const client = new LMStudioClient();
            const model = await client.llm.model("openai/gpt-oss-20b");
            for await (const fragment of model.respond("What are the top 3 netflix shows?", 
                { 
                    structured : { type: "json", jsonSchema: NetflixShowData } 
                }
            )) 
            {
                console.info(fragment);
            }
            ~*/
            console.log(data);
        } catch (error) {
            console.error("Error querying the language model:", error);
        }
    }

    console.log(data);
    setTimeout(() => { 
        LLMnetflixQuery();
        setLoading(false);
      }, 300);
}