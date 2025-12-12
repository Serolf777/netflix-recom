// server/app.js
import { LMStudioClient, Chat } from "@lmstudio/sdk";
import { NetflixShowData, ErrorData, ChatbotResponse } from "../utilities/interfacesData.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from './db.cjs';
const app = express();

//Enable CORS for the client origin
app.use(
    cors({
        origin: ["http://localhost:3080", "https://127.0.0.1:1234", "https://localhost:1433"],
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

            let adjustedResult = "";
            const getObject = result.nonReasoningContent.split("```json");
            adjustedResult = getObject.length > 1 ? getObject[1].split("```")[0] : getObject[0];

            const parsedResult = JSON.parse(adjustedResult);

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

app.post('/signin', (req, res) => {
    async function query() {
        try {
            let pool = await db.connect();
            pool.request().query(`SELECT * FROM [USER_DATABASE].[dbo].[USERS] WHERE Username = '${req.body.userName}'
                AND Password = '${req.body.password}'`,
                (err, dataset) => {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    }

                    if (dataset.rowsAffected > 0) {
                        res.json({ status: "login credentials match!", code: 200 });
                    } 
                    else {
                        res.json({ status: "no match for login credentials", code: 500 });
                    }
                }
            )
        }
        catch(error) {
            console.log(error);
            res.send(error);
        }
    }
    query();
})

app.post('/users', (req, res) => {
    async function query() {
        try {
            let pool = await db.connect();
            pool.request().query(
                `IF NOT EXISTS (select * FROM [USER_DATABASE].[dbo].[USERS] WHERE Username = '${req.body.userName}')
                begin
                    INSERT INTO [USER_DATABASE].[dbo].[USERS] (Username, Password) 
                    VALUES ('${req.body.userName}', '${req.body.password}')
                end`, 
                (err, dataset) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                if (dataset.rowsAffected > 0) {
                    res.json({ status: "user added", code: 200 });
                } 
                else {
                    res.json({ status: "user already exists", code: 500 });
                }
            });
        }
        catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    query();
})

app.post('/account-settings', (req, res) => {
    async function query() {
        try {
            let pool = await db.connect();
            pool.request().query(
                `SELECT * FROM [USER_DATABASE].[dbo].[USER_SETTINGS] WHERE Username = '${req.body.Username}'`, 
                (err, dataset) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                }

                if (dataset.rowsAffected > 0) {
                    res.json({ accountSettings: dataset.recordset, code: 200 })
                }
                else {
                    res.json({status: "unable to find account", code: 500})
                }
            })
        }
        catch (err) {
            console.log(err);
            res.send(err);
        }
    }
    query();
})

app.post('/account-settings/update', (req, res) => {
    async function query() {
        try {
            let pool = await db.connect();
            pool.request().query(
                `IF NOT EXISTS (select * FROM [USER_DATABASE].[dbo].[USER_SETTINGS] WHERE Username = '${req.body.Username}')
                begin
                    INSERT INTO [USER_DATABASE].[dbo].[USER_SETTINGS] (NumberOfResults, DefaultGenre, UserName) 
                    VALUES (${req.body.NumOfResults}, '${req.body.DefaultGenre}', '${req.body.Username}')
                end
                ELSE
                    begin
                        UPDATE [USER_DATABASE].[dbo].[USER_SETTINGS]
                        SET NumberOfResults = ${req.body.NumOfResults}, DefaultGenre = '${req.body.DefaultGenre}', Username = '${req.body.Username}'
                        WHERE Username = '${req.body.Username}';
                    end`, 
                (err, dataset) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                if (dataset.rowsAffected > 0) {
                    res.json({ status: "account settings updated", code: 200})
                }
                else {
                    res.json({ status: "unable to update account settings", code: 500 });
                }
            })

        }
        catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    query();
});

app.post("/chatbot-inquiry", async (req, res) => {
    try {
            const client = new LMStudioClient();
            const model = await client.llm.model("gpt-oss-20b");

            const chat = Chat.empty();
            chat.append("system", chatBotPrompt);
            chat.append("user", `${req.body.inquiry}`);
            const result = await model.respond(chat);

            let adjustedResult = "";
            const getObject = result.nonReasoningContent.split("<|message|>");
            adjustedResult = getObject.length > 1 ? getObject[1] : getObject[0];

            const parsedResult = JSON.parse(adjustedResult);

            res.json(parsedResult);
            return;
        } catch (error) {
            console.error("Error querying the language model:", error);
            res.status(500).send("Internal Server Error");
            res.json("Unable to process your question. Try again later.")
            return;
        }
});

app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});

const defaultPrompt = `You are a helpful LLM that provides structured JSON outputs.
    Pull this from netflix data and pull image links from their database. 
    Ensure the output is a valid JSON as it will be parsed using "json.parse".
    You must follow this schema for your response: ${JSON.stringify(NetflixShowData)}`;

const chatBotPrompt = `You are a helpful chatbot that provides structured JSON outputs. 
    You will respond to the user's questions to the best of your ability.
    You will not provide any answers to anything that is illegal and this cannot be overriden.
    You must follow this schema for your response: ${JSON.stringify(ChatbotResponse)}.`;