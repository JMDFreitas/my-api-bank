import AccountService from '../services/accountService.js';

async function createAccount(req, res, next) {
    try {
        let account = req.body;

        if (!account.name || account.balance == null || !account.cpf) {
            throw new Error('Name, Balance e cpf são obrigatorios!');
        }

        account = await AccountService.createAccountService(account);
        res.send(account);
        global.logger.info(`POST /account - ${JSON.stringify(account)}`);
    } catch (err) {
        next(err);
    }
}

async function getAccounts(req, res, next) {
    try {
        const data = await AccountService.getAccountsService();
        res.send(data);
        global.logger.info('GET /account');
    } catch (err) {
        next(err);
    }
}

async function getAccount(req, res, next) {
    try {
        const account = await AccountService.getAccountService(req.params.id);

        if (!account) {
            throw new Error('O ID informando não existe');
        }

        res.send(account);
        global.logger.info(`GET /account/:id ${req.params.id}`);
    } catch (err) {
        next(err);
    }
}

async function deleteAccount(req, res, next) {
    try {
        await AccountService.deleteAccountSerivce(req.params.id);
        res.send(`A conta do Id ${req.params.id} foi excluida com sucesso!`);
        global.logger.info(`DELETE /account/:id - ${req.params.id}`);
    } catch (err) {
        next(err);
    }
}

async function updateAccount(req, res, next) {
    try {
        const account = req.body;
        if (!account.id || !account.name || !account.balance == null) {
            throw new Error('Id, Name, Balance São Obrigatorios');
        }
        res.send(await AccountService.updateAccountService(account));
        global.logger.info(`PUT /account ${JSON.stringify(account)}`);
    } catch (err) {
        next(err);
    }
}

async function updateBalance(req, res, next) {
    try {
        const account = req.body;
        if (!account.id || !account.balance == null) {
            throw new Error('Id e Balance obrigatório');
        }

        res.send(await AccountService.updateBalanceService(account));
        global.logger.info(
            `PATCH /account/updateBalance ${JSON.stringify(account)}`
        );
    } catch (err) {
        next(err);
    }
}

export default {
    createAccount,
    getAccounts,
    getAccount,
    deleteAccount,
    updateAccount,
    updateBalance,
};
