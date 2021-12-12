import { Program, Provider } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react"
import { Connection, VoteAccount } from "@solana/web3.js";
import { network, preflightCommitment, programID } from "../utils/config";
import idl from "../utils/idl.json";

export default function GirlCard({img, girlName}) {
    const wallet = useWallet();
    console.log(wallet);

    async function getVotes() {
      const connection = new Connection(network, preflightCommitment);
      const provider = new Provider(connection, wallet, preflightCommitment);
      const program = new Program(idl, programID, provider);
      try {
        const account = await program.account.voting.fetch(VoteAccount.publicKey);
        console.log(account)
      } catch(err) {
        console.error(err);
      }
    }
    return (
        <div className='girl'>
        <h3>Team {girlName}</h3>
        <img src={img} />
        <button>Vote</button>
        <h4>5555</h4>
      </div>
    )
}