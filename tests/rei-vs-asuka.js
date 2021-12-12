const anchor = require('@project-serum/anchor');
const { SystemProgram } = require('@solana/web3.js');
const { assert } = require('chai');

describe('rei-vs-asuka', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());
  const provider = anchor.Provider.env(); 
  const voteAccount = anchor.web3.Keypair.generate(); 
  it('Is initialized!', async () => {
    // Add your test here.
    const program = anchor.workspace.ReiVsAsuka;
    const tx = await program.rpc.initialize({
      accounts: {
        voteAccount: voteAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [voteAccount]
    });
    console.log("Your transaction signature", tx);

  });

  it("Fetch votes", async () => {
    const program = anchor.workspace.ReiVsAsuka;
    let result = await program.account.voting.fetch(voteAccount.publicKey);
    assert("0", result.reiVotes);
    assert("0", result.asukaVotes);
  });

  it("Voting in Rei", async () => {
    const program = anchor.workspace.ReiVsAsuka;
    await program.rpc.voteRei({
      accounts: {
        voteAccount: voteAccount.publicKey,
      }
    });

    let result = await program.account.voting.fetch(voteAccount.publicKey);
    assert("1", result.reiVotes);
  });

  it("Voting in Rei", async () => {
    const program = anchor.workspace.ReiVsAsuka;
    await program.rpc.voteAsuka({
      accounts: {
        voteAccount: voteAccount.publicKey,
      }
    });

    let result = await program.account.voting.fetch(voteAccount.publicKey);
    assert("1", result.asukaVotes);
  });
});
