import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { PUBLIC_KEY } from "./key";

const connection = new Connection(clusterApiUrl("devnet"))
console.log("Connected to DevNet!")


if(isValidPublicKey()){
    console.log("Public Key is valid!")
    
    const address = new PublicKey(PUBLIC_KEY)
    const balance = await connection.getBalance(address)
    const balanceInSol = balance/LAMPORTS_PER_SOL;
    const accountInfo = await connection.getAccountInfo(address)
    console.log(`Balance : ${balance} lamports or ${balanceInSol} SOL`);
    console.log(`Account Info : ${accountInfo}`)

}else{
    console.log("Invalid Public Key.")
}

    

//check if the public key is valid and on the ed25519 curve.
function isValidPublicKey(){
    try{
        const address = new PublicKey(PUBLIC_KEY)
        return PublicKey.isOnCurve(address.toBytes())
    }
    catch(e){
        return false
    }
}