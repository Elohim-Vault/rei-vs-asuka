const assert = require("assert");
const anchor = require("@project-serum/anchor");

describe("rei-vs-asuka", () => {
  // Configure the client
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.ReiVsAsuka;

  let voteAccount, voteAccountBump;
  before(async () => {
    [voteAccount, voteAccountBump] =
      await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from("vote_account")],
        program.programId
      );
  });

  it("Initializes with 0 votes for crunchy and smooth", async () => {
    await program.rpc.initialize(new anchor.BN(voteAccountBump), {
      accounts: {
        user: provider.wallet.publicKey,
        voteAccount: voteAccount,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
    });

    let currentVoteAccountState = await program.account.votingState.fetch(
      voteAccount
    );
    assert.equal(0, currentVoteAccountState.reiVotes.toNumber());
    assert.equal(0, currentVoteAccountState.asukaVotes.toNumber());
  });

  it("Votes correctly for Rei", async () => {
    await program.rpc.voteRei({
      accounts: {
        voteAccount: voteAccount,
      },
    });

    let currentVoteAccountState = await program.account.votingState.fetch(
      voteAccount
    );
    assert.equal(3, currentVoteAccountState.reiVotes.toNumber());
    assert.equal(2, currentVoteAccountState.asukaVotes.toNumber());
  });

  it("Votes correctly for Asuka", async () => {
    await program.rpc.voteAsuka({
      accounts: {
        voteAccount: voteAccount,
      },
    });

    let currentVoteAccountState = await program.account.votingState.fetch(
      voteAccount
    );
    assert.equal(3, currentVoteAccountState.reiVotes.toNumber());
    assert.equal(3, currentVoteAccountState.asukaVotes.toNumber());
  });
});