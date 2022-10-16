import * as dotenv from 'dotenv';
import { createWriteStream, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
export const path = fileURLToPath(new URL('../.env', import.meta.url));
export function config() {
    const env = dotenv.parse(readFileSync(path));
    for (let prop in env) {
        process.env[prop] = env[prop];
    }
}
export function save(env) {
    const stream = createWriteStream(path);
    for (let prop in env) {
        stream.write(prop + '=' + env[prop] + '\r\n');
    }
    stream.end();
}
