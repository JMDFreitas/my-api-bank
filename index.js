import express from 'express';
import accountsRouter from './routes/account.js';
import { promises as fs } from 'fs';

global.fileName = 'accounts.json';
const { readFile, writeFile } = fs;
const app = express();
app.use(express.json());
app.use('/account', accountsRouter);

app.listen(3000, async () => {
    try {
        await readFile(global.fileName);
        console.log('MY-API-BANK STARTED');
    } catch (error) {
        const initialJson = {
            nextId: 1,
            accounts: [],
        };
        writeFile(global.fileName, JSON.stringify(initialJson, null, 4))
            .then(() => {
                console.log('MY-API-BANK STARTED AND FILE CREATED');
            })
            .catch(error => {
                console.log(error);
            });
    }
});
