import express from "express";
import { engine } from "express-handlebars";
import config from "./config/config.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import homeChat from "./routes/homeChat.router.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";

import { Configuration , OpenAIApi} from "openai"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = config.server.port;

const app = express();

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const io = new Server(server);

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const API_KEY = config.openai.key
const ORGANIZATION_ID= config.openai.organizationId

const configuration = new Configuration({
    apiKey: API_KEY,
    organization: ORGANIZATION_ID
})

const openai = new OpenAIApi(configuration)

async function chatQuestion(question) {
    const response = await openai.createChatCompletion({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 256,
    })

    console.log(response.data.choices)

    return response.data.choices[0].text
}

io.on("connection", async (socket) => {
  console.log("Connected to io server");

  socket.on("messageCreated", async (message) => {
    
    const messageResponse = await chatQuestion(message);

    io.emit("responseCreated", messageResponse)
  });

});

app.use("/", homeChat);
export default app;
