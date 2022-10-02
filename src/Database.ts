import { DBQuery, SearchQuery } from "./Interface.js";
import MongoDBController from "./MongoDBController.js";

export default class Database {
    constructor(public controller: MongoDBController) {}

    findTheatre(query: SearchQuery, offset = 0, limit = 0) : Promise<DBQuery[]> {
        return this.controller.findTheatre(query, offset, limit);
    }

    insertTheatre(query: SearchQuery) : Promise<boolean> { 
        return this.controller.insertTheatre(query);
    }

    createTheatreId() : Promise<string> {
        return this.controller.createTheatreId();
    }

    findHost(host: string, owner?: string) : Promise<boolean> {
        return this.controller.findHost(host, owner);
    }

    insertHost(host: string, owner?: string) : Promise<boolean> {
        return this.controller.insertHost(host, owner);
    }

    deleteHost(host: string, owner?: string) : Promise<boolean> {
        return this.controller.deleteHost(host, owner);
    }
}
