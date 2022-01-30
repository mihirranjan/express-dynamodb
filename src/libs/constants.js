require('dotenv').config();

export default {
    PORT: process.env.PORT,
    REGION: process.env.REGION,
    ACCESS_KEY: process.env.ACCESS_KEY,
    SECRET_KEY: process.env.SECRET_KEY
}