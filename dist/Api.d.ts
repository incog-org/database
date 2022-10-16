/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "http";
import Database from "./Index";
export default class Api {
    db: Database;
    directory: string;
    constructor(db: Database, directory: string);
    routeRequest(request: IncomingMessage, response: ServerResponse): boolean;
}
