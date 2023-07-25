import { Configuration , OpenAIApi} from "openai"
/*
import config from "../config/config"

const API_KEY = config.openai.key
const ORGANIZATION_ID= config.openai.organizationId

const configuration = new Configuration({
    apiKey: API_KEY,
    organization: ORGANIZATION_ID
})

const openai = new OpenAIApi(configuration)

async function chatQuestion(question) {
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role:"user",
                content: question
            }
        ]
    })

    console.log(response.data.choices)

    return response
}*/

export const showChat = (req,res) => {
    res.render('chat')
}
