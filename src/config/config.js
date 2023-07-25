import 'dotenv/config'
let config= {};

config.server= {
    port: process.env.PORT,
    host: 'http://localhost:'+ process.env.PORT,
}

config.openai = {
    key: process.env.API_KEY,
    organizationId: process.env.ORGANIZATION_ID
}

export default config;