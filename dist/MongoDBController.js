import crypto from 'node:crypto';
const THEATRE_COLLECTION = 'theatre';
const DOMAIN_COLLECTION = 'domains';
export default class MongoDBController {
    db;
    constructor(db) {
        this.db = db;
    }
    async findTheatre(query, offset = 0, limit = 0) {
        const collection = this.db.collection(THEATRE_COLLECTION);
        return (await collection.find({ ...query, name: { $regex: (query.name || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' } }).sort({ name: 1 }).collation({ locale: "en", caseLevel: true }).skip(offset).limit(limit).toArray());
    }
    async insertTheatre(query) {
        if (!query.src || !query.name) {
            return false;
        }
        if (!query.category) {
            query.category = [];
        }
        else {
            if (!Array.isArray(query.category)) {
                query.category = [query.category];
            }
        }
        if (!query.type) {
            query.type = 'embed';
        }
        query.id = await this.createTheatreId();
        this.db.collection(THEATRE_COLLECTION).insertOne(query);
        return true;
    }
    async createTheatreId() {
        let id = crypto.randomBytes(4).toString("hex");
        let entry = await this.findTheatre({ id });
        if (!!entry.length) {
            return await this.createTheatreId();
        }
        return id;
    }
    async findHost(host, owner) {
        const collection = this.db.collection(DOMAIN_COLLECTION);
        const entry = await collection.findOne({ host, owner: owner || null });
        return !!entry;
    }
    async insertHost(host, owner) {
        const collection = this.db.collection(DOMAIN_COLLECTION);
        const entry = await collection.insertOne({ host, owner: owner || null });
        return !!entry;
    }
    async deleteHost(host, owner) {
        const collection = this.db.collection(DOMAIN_COLLECTION);
        const entry = await collection.deleteOne({ host, owner: owner || null });
        return !!entry;
    }
}
