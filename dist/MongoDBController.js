import crypto from 'node:crypto';
const THEATRE_COLLECTION = 'theatre';
const DOMAIN_COLLECTION = 'domains';
export default class MongoDBController {
    db;
    disconnect;
    constructor(db, disconnect) {
        this.db = db;
        this.disconnect = disconnect;
    }
    async findTheatre(query, offset = 0, limit = 0) {
        const collection = this.db.collection(THEATRE_COLLECTION);
        return (await collection.find({ ...query, name: { $regex: (query.name || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' } }).sort({ name: 1 }).collation({ locale: "en", caseLevel: true }).skip(offset).limit(limit).toArray());
    }
    async deleteTheatre(id) {
        const [doc] = await this.findTheatre({ id });
        if (!doc) {
            throw new RangeError('Document not found');
        }
        await this.db.collection(THEATRE_COLLECTION).deleteOne({ id });
        return doc;
    }
    async updateTheatre(id, query) {
        const [doc] = await this.findTheatre({ id });
        if (!doc) {
            throw new RangeError('Document not found');
        }
        query.id = id;
        if (query.category && !Array.isArray(query.category)) {
            query.category = [query.category];
        }
        await this.db.collection(THEATRE_COLLECTION).updateOne(doc, { $set: query });
        return { original: doc, updated: { ...doc, ...query } };
    }
    async insertTheatre(query) {
        if (!query.src || !query.name) {
            throw new RangeError('Missing properties');
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
        await this.db.collection(THEATRE_COLLECTION).insertOne(query);
        return query.id;
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
    close() {
    }
}
