export default class ClientApi {
    constructor(public directory: string) {
        if (!directory.endsWith('/')) {
            throw new RangeError('Directory must end with /');
        }
    }
    async lookup(query: Lookup) {
        const res = await fetch(this.directory + '?' + new URLSearchParams({ ...query }));
        return (await res.json()) as Entry[]
    }
    async find(id: string) {
        const res = await fetch(this.directory + id + '/');
        return (await res.json()) as Entry;
    }
}

export interface Entry {
    id: string,
    category: string[],
    name: string,
    src: string
}

export interface Lookup {
    id?: string, 
    search?: string, 
    offset?: string, 
    limit?: string, 
    category?: string
}