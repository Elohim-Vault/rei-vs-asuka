use anchor_lang::prelude::*;

declare_id!("9Je2oLNDKnQNdVg8XmiTQ6DoVdTmHnykrrb6opLoDYns");

#[program]
pub mod rei_vs_asuka {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.rei_votes = 0;
        vote_account.asuka_votes = 0;
        Ok(())
    }

    pub fn vote_rei(ctx: Context<Vote>) -> ProgramResult {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.rei_votes += 1;
        Ok(())
    }

    pub fn vote_asuka(ctx: Context<Vote>) -> ProgramResult {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.asuka_votes += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 16 + 16)]
    pub vote_account: Account<'info, Voting>,
    #[account(mut)] // ?!
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut)]
    pub vote_account: Account<'info, Voting>
}
#[account]
pub struct Voting {
    pub rei_votes: u64,
    pub asuka_votes: u64,
}
