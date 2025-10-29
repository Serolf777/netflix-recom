// server/app.js
import { LMStudioClient, Chat } from "@lmstudio/sdk";
import { NetflixShowData } from "../utilities/netflixShowData.js";
import express from "express";
import cors from "cors";
const app = express();

//Enable CORS for the client origin
app.use(
    cors({
        origin: ["http://localhost:8080", "https://127.0.0.1:1234"],
        methods: ["GET", "POST"]
    })
);

app.get("/data/:genre", async (req, res) => {
    try {
            const client = new LMStudioClient();
            const model = await client.llm.model("gpt-oss-20b");

            const chat = Chat.empty();
            chat.append("system", "Provide the answer structured formated as per the following JSON schema" + 
                "and do not include ```json at beginning: " 
                + JSON.stringify(NetflixShowData)
            );
            chat.append("user", `What are the top 3 netflix shows in ${req.params.genre} genre?` +
                "Pull this from netflix data and pull image links from their database");
            const result = await model.respond(chat);

            const parsedResult = JSON.parse(result.nonReasoningContent);

            res.json(parsedResult);
            return;
        } catch (error) {
            console.error("Error querying the language model:", error);
            res.status(500).send("Internal Server Error");
            return;
        }
});

app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});
