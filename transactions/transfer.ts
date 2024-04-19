import { Connection, Transaction, SystemProgram, sendAndConfirmTransaction, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as dotenv from 'dotenv'
import { getKeypairFromEnvironment, airdropIfRequired } from "@solana-developers/helpers";

dotenv.config()

//accessing the recipient public key from command-line argument
const recipient = process.argv[2] || null;
// console.log(process.argv) -> logs an array containing the arguments passed to the process when run in the command line


if (!recipient) {
    console.log("Please provide a public key to send to.");
    process.exit(1);
}

//accessing the sender keypair from .env
const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
console.log("Sender Keypair loaded.")

console.log(`Recipient Public Key : ${recipient}`);
console.log("Recipient Public Key loaded.")

const toPubkey = new PublicKey(recipient);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
console.log("Connected to Solana.")

// await airdropIfRequired(
//     connection,
//     toPubkey,
//     1 * LAMPORTS_PER_SOL,
//     0.5 * LAMPORTS_PER_SOL,
// );

const transaction = new Transaction()

//accessing the amount from command-line argument 
const AmountInLamports = parseInt(process.argv[3]) || null

if(!AmountInLamports){
    console.log("Please provide the amount(in lamports) for transaction.")
    process.exit(1)
}

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey : senderKeypair.publicKey,
    toPubkey,
    lamports : AmountInLamports
})

transaction.add(sendSolInstruction)

const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [
        senderKeypair
    ]
)

console.log(`Transferred ${AmountInLamports} to ${toPubkey}`)
console.log(`Transaction signature : ${signature}`)

//P.S : You can check the transaction details using the signature on solana explorer.