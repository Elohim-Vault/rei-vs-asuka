import { Program, Provider } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react"
import { Connection } from "@solana/web3.js";
import { network, preflightCommitment, programID } from "../utils/config";
import idl from "../utils/idl.json";
import { web3 } from "@project-serum/anchor";
import { useState } from "react";

export default function GirlCard({img, girlName}) {
    const [asukaVotes, setAsukaVotes] = useState(0);
    const [reiVotes, setReiVotes] = useState(0);


    async function getVotes() {
      const wallet = useWallet();
      const connection = new Connection(network, preflightCommitment);
      const provider = new Provider(connection, wallet, preflightCommitment);
      const program = new Program(idl, programID, provider);

      let [voteAccount, voteAccountBump] =
      await web3.PublicKey.findProgramAddress(
        [Buffer.from("vote_account")],
        programID
      );

      try {
        let currentVoteAccountState = await program.account.votingState.fetch(
          voteAccount
        );
        setReiVotes(currentVoteAccountState.reiVotes.toNumber());
        setAsukaVotes(currentVoteAccountState.asukaVotes.toNumber() );
      } catch(err) {
        console.error(err);
      }
    }

    useEffect(() => {
      getVotes()
    }, []);
    
    return (
        <div className='girl'>
          <h3>Team {girlName}</h3>
          <img src={img} />
          <button>Vote</button>
          <h4>{girlName == "Rei Ayanami" ? reiVotes : asukaVotes}</h4>
        </div>
    )
}