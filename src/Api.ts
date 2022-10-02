import { IncomingMessage, ServerResponse } from "http";
import { SearchQuery } from './Interface.js'
import Database from "./App";

const RES_HEADERS = {
    'access-control-allow-headers': '*',
    'access-control-allow-methods': '*',
    'access-control-allow-origin': '*',
    'access-control-expose-headers': '*',
    'access-control-max-age': '7200',
    'content-type': 'application/json'
}

export default class Api {
    constructor(public db: Database, public directory: string) {
        if (!directory.startsWith('/') || !directory.endsWith('/')) {
			throw new RangeError('Directory must start and end with /');
		}
    }

    routeRequest(request: IncomingMessage, response: ServerResponse) {
        if (!request.url?.startsWith(this.directory)) {
            return false;
        }

        const params = new URLSearchParams(request.url.split('?')[1]);
        const category = params.get('category') || '';
        const name = params.get('search') || '';

        const query = { name } as SearchQuery;
        
        if (category) {
            query.category = category;
        }

        let offset = Number((params.get('offset') || '0'));
        let limit = Number((params.get('limit') || '0'));;

        if (0 > offset || isNaN(offset)) {
            offset = 0;
        }

        if (0 > limit || isNaN(limit)) {
            limit = 0;
        }


        this.db.findTheatre(query, offset, limit).then(results => {
            response.writeHead(200, RES_HEADERS);
            response.end(
                JSON.stringify(results)
            )
        });

        return true;
    }

}