import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        let account = req.body;
        const data = JSON.parse(await readFile(global.fileName));
        account = { id: data.nextId++, ...account };
        data.accounts.push(account);

        await writeFile(global.fileName, JSON.stringify(data, null, 4));

        res.send(account);
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        delete data.nextId;
        res.send(data);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const account = data.accounts.find(
            account => account.id === parseInt(req.params.id)
        );
        res.send(account);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        data.accounts = data.accounts.filter(
            account => account.id !== parseInt(req.params.id)
        );
        await writeFile(global.fileName, JSON.stringify(data, null, 4));
        res.end();
    } catch (err) {
        next(err);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const accountToUpdate = req.body;
        const data = JSON.parse(await readFile(global.fileName));
        const index = data.accounts.findIndex(
            account => account.id === accountToUpdate.id
        );
        data.accounts[index] = accountToUpdate;
        await writeFile(global.fileName, JSON.stringify(data, null, 4));
        res.send(accountToUpdate);
    } catch (err) {
        next(err);
    }
});

router.patch('/updateBalance', async (req, res, next) => {
    try {
        const accountToUpdate = req.body;
        const data = JSON.parse(await readFile(global.fileName));
        const index = data.accounts.findIndex(
            account => account.id === accountToUpdate.id
        );
        data.accounts[index].balance = accountToUpdate.balance;
        await writeFile(global.fileName, JSON.stringify(data, null, 4));
        res.send(data.accounts[index]);
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    console.log(err);
    res.status(400).send({ error: error.message });
});
export default router;
