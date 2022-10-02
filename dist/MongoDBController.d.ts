import { Db } from 'mongodb';
import { DBQuery, SearchQuery } from './Interface.js';
export default class MongoDBController {
    db: Db;
    constructor(db: Db);
    findTheatre(query: SearchQuery, offset?: number, limit?: number): Promise<DBQuery[]>;
    insertTheatre(query: SearchQuery): Promise<boolean>;
    createTheatreId(): Promise<string>;
    findHost(host: string, owner?: string): Promise<boolean>;
    insertHost(host: string, owner?: string): Promise<boolean>;
    deleteHost(host: string, owner?: string): Promise<boolean>;
}
