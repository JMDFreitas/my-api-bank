import AccountRepository from '../repositories/accountRepository.js';

async function createAccountService(account) {
    return await AccountRepository.insertAccount(account);
}

async function getAccountsService() {
    return await AccountRepository.getAccounts();
}

async function getAccountService(id) {
    return await AccountRepository.getAccount(id);
}

async function deleteAccountSerivce(id) {
    return await AccountRepository.deleteAccount(id);
}

async function updateAccountService(account) {
    return await AccountRepository.updateAccount(account);
}

async function updateBalanceService(account) {
    const acc = await AccountRepository.getAccount(account.id);
    acc.balance = account.balance;
    return await AccountRepository.updateAccount(acc);
}

export default {
    createAccountService,
    getAccountsService,
    getAccountService,
    deleteAccountSerivce,
    updateAccountService,
    updateBalanceService,
};
