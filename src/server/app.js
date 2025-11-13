// server/app.js
import { LMStudioClient, Chat } from "@lmstudio/sdk";
import { NetflixShowData, ErrorData } from "../utilities/netflixShowData.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

//Enable CORS for the client origin
app.use(
    cors({
        origin: ["http://localhost:3080", "https://127.0.0.1:1234"],
        methods: ["GET", "POST"]
    })
);

app.use(bodyParser.json());

app.get("/data/:genre", async (req, res) => {
    try {
            const client = new LMStudioClient();
            const model = await client.llm.model("gpt-oss-20b");

            const chat = Chat.empty();
            chat.append("system", defaultPrompt);
            chat.append("user", `What are the top 3 netflix shows ${req.params.genre !== 'all' ? `in ${req.params.genre}`: ""}`);
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

app.get("/userSearch", async (req, res) => {
    try {
            const client = new LMStudioClient();
            const model = await client.llm.model("gpt-oss-20b");

            const chat = Chat.empty();
            chat.append("system", "Verify if user's query is relevant to Netflix shows and if not" +
                "return an error stating 'No relevant shows found formatted per following JSON schema " +
                JSON.stringify(ErrorData) +
                defaultPrompt);
            chat.append("user", `${req.query.search}?`);
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

const users = [];

app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/users', (req, res) => {
    try {
        const user = { username: req.body.username, password: req.body.password };
        users.push(user);
        res.status(200).send({ status: "success" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});

const defaultPrompt = `Pull this from netflix data and pull image links from their database. 
    Provide the answer structured formated as per the following JSON schema and do not include 
    \`\`\`json at beginning: ${JSON.stringify(NetflixShowData)}`