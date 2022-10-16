#!/usr/bin/env node

import connect from "../Connect.js";
import { program } from 'commander';

program.command('create')
.requiredOption('-n, --name <name>', 'name')
.requiredOption('-s, --src <src>', 'src')
.requiredOption('-c, --category <category>', 'category')
.requiredOption('-t, --type <type>', 'type')
.action(async({ name, src, category, type }) => {
    const database = await connect();

    const id = await database.insertTheatre({ name, src, category, type });

    console.log(
        name + '\n' +
        'Src: ' + src, '\n' +
        'Category: ' + category, '\n' +
        'Type: ' + type, '\n' +
        'Id: ' + id
    )
    database.disconnect();
})

program.command('find')
.option('-n, --name <name>', 'name')
.option('-s, --src <src>', 'src')
.option('-c, --category <category>', 'category')
.option('-t, --type <type>', 'type')
.option('-i, --id <id>', 'id').action(async (query) => {
    const database = await connect();
    const found = await database.findTheatre(query);

    console.log(found);
    database.disconnect();
});

program.command('delete')
.argument('<id>')
.action(async id => {
    const database = await connect();
    const result = await database.deleteTheatre(id);

    console.log(result);
    database.disconnect();
});

program.command('update')
.argument('<id>')
.option('-n, --name <name>', 'name')
.option('-s, --src <src>', 'src')
.option('-c, --category <category>', 'category')
.option('-t, --type <type>', 'type')
.action(async (id, query) => {
    const database = await connect();
    
    const { original, updated } = await database.updateTheatre(id, query); 

    console.log(
        'Name: ' + original.name + ' => ' + updated.name + '\n' +
        'Src: ' + original.src + ' => ' + updated.src + '\n' +
        'Category: ' + JSON.stringify(original.category) + ' => ' + JSON.stringify(updated.category) + '\n' +
        'Type: ' + original.type + ' => ' + updated.type + '\n'
    )
    database.disconnect();
});

program.parse(process.argv);