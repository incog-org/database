#!/usr/bin/env node

import { MongoClient } from 'mongodb';
import Database from './Database.js';
import { config } from './env.js';
import MongoDBController from './MongoDBController.js';

config();

export default async function connect() : Promise<Database> {
    if (!process.env.DB) {
        throw new RangeError('No DB connection has been setup')
    }

    const db = process.env.DB || '';

    if (db === 'MONGODB') {
        const url = process.env.MONGODB_URL || '';

        const dbo = await MongoClient.connect(url);
        const db = dbo.db((process.env.MONGODB_DB || ''));

        return new Database(
            new MongoDBController(db, () => dbo.close())
        )
    }

    throw new Error('Could not connect to database')
} 