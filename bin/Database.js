#!/usr/bin/env node

import { fork } from 'node:child_process';
import { fileURLToPath } from 'node:url';

fork(
    fileURLToPath(new URL('../dist/cli/Database.js', import.meta.url)), 
    process.argv.slice(2)
);