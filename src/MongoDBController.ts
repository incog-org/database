import { Db, WithId } from 'mongodb'
import crypto from 'node:crypto';
import { DBQuery, SearchQuery } from './Interface.js';

const THEATRE_COLLECTION = 'theatre';
const DOMAIN_COLLECTION = 'domains';

export default class MongoDBController {
    constructor(public db: Db) {}

    async findTheatre(query: SearchQuery, offset = 0, limit = 0) : Promise<DBQuery[]> {
        const collection = this.db.collection(THEATRE_COLLECTION);
        
        return (await collection.find({ ...query, name: { $regex: (query.name || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' }}).sort({ name: 1 }).collation({ locale: "en", caseLevel: true }).skip(offset).limit(limit).toArray()) as WithId<DBQuery>[]
    }


    async insertTheatre(query: SearchQuery) : Promise<boolean> {

        if (!query.src || !query.name) {
            return false;
        }

        if (!query.category) {
            query.category = []
        } else {
            if (!Array.isArray(query.category)) {
                query.category = [ query.category ]
            }
        }

        if (!query.type) {
            query.type = 'embed'
        }


        query.id = await this.createTheatreId();

        this.db.collection(THEATRE_COLLECTION).insertOne(query);

        return true;
    }

    async createTheatreId() : Promise<string> {
        let id = crypto.randomBytes(4).toString("hex");
        let entry = await this.findTheatre({ id });

        if (!!entry.length) {
            return await this.createTheatreId()
        }
        
        return id;
    }

    async findHost(host: string, owner?: string) : Promise<boolean> {
        const collection = this.db.collection(DOMAIN_COLLECTION);

        const entry = await collection.findOne({ host, owner: owner || null });

        return !!entry;
    }

    async insertHost(host: string, owner?: string) : Promise<boolean> {
        const collection = this.db.collection(DOMAIN_COLLECTION);

        const entry = await collection.insertOne({ host, owner: owner || null });
        return !!entry;
    }

    async deleteHost(host: string, owner?: string) : Promise<boolean> {
        const collection = this.db.collection(DOMAIN_COLLECTION);

        const entry = await collection.deleteOne({ host, owner: owner || null })

        return !!entry;
    }
}