use anchor_lang::prelude::*;

declare_id!("9Je2oLNDKnQNdVg8XmiTQ6DoVdTmHnykrrb6opLoDYns");

#[program]
pub mod rei_vs_asuka {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, vote_account_bump: u8) -> ProgramResult {
        ctx.accounts.vote_account.bump = vote_account_bump;
        Ok(())
    }

    pub fn vote_rei(ctx: Context<Vote>) -> ProgramResult {
        ctx.accounts.vote_account.rei_votes += 1;
        Ok(())
    }

    pub fn vote_asuka(ctx: Context<Vote>) -> ProgramResult {
        ctx.accounts.vote_account.asuka_votes += 1;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(vote_account_bump: u8)]
pub struct Initialize<'info> {
    #[account(
        init,
        seeds = [b"vote_account".as_ref()],
        bump = vote_account_bump,
        payer = user
    )]
    pub vote_account: Account<'info, VotingState>,
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(
        mut,
        seeds = [b"vote_account".as_ref()],
        bump = vote_account.bump
    )]
    pub vote_account: Account<'info, VotingState>
}

#[account]
#[derive(Default)]
pub struct VotingState {
    pub rei_votes: u64,
    pub asuka_votes: u64,
    bump: u8,
}
