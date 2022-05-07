import express from 'express';
import winston from 'winston';
import accountsRouter from './routes/accountRoutes.js';
import { promises as fs } from 'fs';
import { buldSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

global.fileName = 'accounts.json';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
    level: 'silly',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'my-bank-api.log' }),
    ],
    format: combine(label({ label: 'my-bank-api' }), timestamp(), myFormat),
});

const schema = buldSchema(`
    type Account {
        id: Int
        name: String
        balance: Float
    }
    type Query {
        getAccounts: [Accounts]
        getAccount(id: Int): Account
    }
`);

const { readFile, writeFile } = fs;
const app = express();
app.use(express.json());
app.use('/account', accountsRouter);
app.use(
    'graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: null,
        graphiql: true,
    })
);

app.listen(3000, async () => {
    try {
        await readFile(global.fileName);
        global.logger.info('MY-API-BANK STARTED');
    } catch (err) {
        const initialJson = {
            nextId: 1,
            accounts: [],
        };
        writeFile(global.fileName, JSON.stringify(initialJson, null, 4))
            .then(() => {
                logger.info('MY-API-BANK STARTED AND FILE CREATED');
            })
            .catch(err => {
                logger.error(err);
            });
    }
});
