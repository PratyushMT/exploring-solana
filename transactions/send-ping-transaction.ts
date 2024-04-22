import { airdropIfRequired, getKeypairFromEnvironment } from '@solana-developers/helpers'
import { Connection, LAMPORTS_PER_SOL, clusterApiUrl, PublicKey, Transaction, TransactionInstruction, sendAndConfirmTransaction } from '@solana/web3.js'
import * as dotenv from 'dotenv'

dotenv.config()

//Address of the onchain program on the Solana Devnet
const PING_PROGRAM_ADDRESS = new PublicKey('ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa')
const PING_PROGRAM_DATA_ADDRESS =  new PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod')

const payer = getKeypairFromEnvironment("SECRET_KEY")
const connection = new Connection(clusterApiUrl('devnet'))

// await airdropIfRequired(
//     connection,
//     sender.publicKey,
//     1 * LAMPORTS_PER_SOL,
//     0.5 * LAMPORTS_PER_SOL,
// )

const transaction = new Transaction()
const programId = new PublicKey(PING_PROGRAM_ADDRESS)
const pingProgramDataId = new PublicKey(PING_PROGRAM_DATA_ADDRESS)

//creating the instruction that requires public key of the program being called and the data address to be written to.
const instruction = new TransactionInstruction({
    keys : [
        {
            pubkey : pingProgramDataId,
            isSigner : false,
            isWritable : true
        },
    ],
    programId
})

transaction.add(instruction)

const signature = await sendAndConfirmTransaction(connection, transaction, [payer])

console.log(`Transaction successful.\nSignature: ${signature}`)
console.log(`Here's the link to your transaction on the Solana Explorer:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

//You can use the signature and check how many times the program has been pinged under the "Program Instruction Logs" section on the Solana Explorer.