// server/app.js
import { LMStudioClient } from "@lmstudio/sdk";
import { NetflixShowData } from "./utilities/constants.tsx";
const express = require("express");
const cors = require("cors");
const app = express();

//Enable CORS for the client origin
app.use(
    cors({
        origin: "http://127.0.0.1:3000",
        methods: ["GET", "POST"]
    })
);

app.get("/data", async (req, res) => {
    const client = new LMStudioClient();
    try {
        const model = await client.llm.model("openai/gpt-oss-20b");
        model
        for await (const fragment of model.respond("What are the top 3 netflix shows?", 
            { 
                structured : { type: "json", jsonSchema: NetflixShowData } 
            }
        )) 
        {
            console.log(fragment);
            res.json(fragment);
        }
        } catch (error) {
            console.error("Error querying the language model:", error);
            res.status(500).send("Internal Server Error");
        }
});

app.listen(3000, () => {
    console.log("Server is running on http://127.0.0.1:3000");
});
