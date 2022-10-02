export default class ClientApi {
    directory: string;
    constructor(directory: string);
    lookup(query: Lookup): Promise<Entry[]>;
    find(id: string): Promise<Entry>;
}
export interface Entry {
    id: string;
    category: string[];
    name: string;
    src: string;
}
export interface Lookup {
    id?: string;
    search?: string;
    offset?: string;
    limit?: string;
    category?: string;
}
