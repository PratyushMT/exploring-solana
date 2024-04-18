import * as dotenv from 'dotenv'
import { getKeypairFromEnvironment } from "@solana-developers/helpers"


dotenv.config()

//accessing keypair from .env
const keypair = getKeypairFromEnvironment("SECRET_KEY")
console.log("Secret key loaded successfully using an env file")