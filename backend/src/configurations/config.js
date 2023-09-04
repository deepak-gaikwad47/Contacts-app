import { config } from 'dotenv'

config();

const value = process.env;

const configuration = Object.freeze({
    port: value.PORT,
    mongo_uri: value.MONGO_URI,
    JWTsecret: value.JWTSECRET,
    cookie_expire: value.COOKIE_EXPIRE
})

export default configuration;