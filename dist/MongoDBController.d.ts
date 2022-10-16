import { Db } from 'mongodb';
import { DBQuery, SearchQuery } from './Interface.js';
export default class MongoDBController {
    db: Db;
    disconnect: () => void;
    constructor(db: Db, disconnect: () => void);
    findTheatre(query: SearchQuery, offset?: number, limit?: number): Promise<DBQuery[]>;
    deleteTheatre(id: string): Promise<DBQuery>;
    updateTheatre(id: string, query: SearchQuery): Promise<{
        original: DBQuery;
        updated: DBQuery;
    }>;
    insertTheatre(query: SearchQuery): Promise<string>;
    createTheatreId(): Promise<string>;
    findHost(host: string, owner?: string): Promise<boolean>;
    insertHost(host: string, owner?: string): Promise<boolean>;
    deleteHost(host: string, owner?: string): Promise<boolean>;
    close(): void;
}
