import { program } from 'commander';
import { MongoClient } from "mongodb";
import connect from '../Connect.js';
import { save } from "../env.js";
program.command('test')
    .action(async () => {
    const db = await connect();
    console.log('Success');
    db.disconnect();
});
program.command('connect')
    .requiredOption('-t, --type <type>', 'type')
    .option('-u, --url <url>', 'url')
    .option('-n, --name <name>', 'name')
    .action(async ({ type, url, name }) => {
    if (type === 'MONGODB') {
        if (!url || !name) {
            throw new RangeError('Invalid properties');
        }
        const dbo = await MongoClient.connect(url);
        save({
            DB: type,
            MONGODB_URL: url,
            MONGODB_DB: name
        });
        dbo.close();
    }
});
program.parse(process.argv);
