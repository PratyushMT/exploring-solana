import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { PUBLIC_KEY } from "./key";

const connection = new Connection(clusterApiUrl("devnet"))
console.log("Connected to DevNet!")


try{
    const  address = new PublicKey(PUBLIC_KEY)
    const isValid = await PublicKey.isOnCurve(address.toBytes())
    if(isValid){
        console.log("Public Key is valid!")
    }
    const balance = await connection.getBalance(address)
    const balanceInSol = balance/LAMPORTS_PER_SOL;
    const accountInfo = await connection.getAccountInfo(address)
    console.log(`Balance : ${balance} lamports or ${balanceInSol} SOL`);
    console.log(`Account Info : ${accountInfo}`)
}catch(e){
    console.error("Not a valid public key.")
}
