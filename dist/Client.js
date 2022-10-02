export default class ClientApi {
    directory;
    constructor(directory) {
        this.directory = directory;
        if (!directory.endsWith('/')) {
            throw new RangeError('Directory must end with /');
        }
    }
    async lookup(query) {
        const res = await fetch(this.directory + '?' + new URLSearchParams({ ...query }));
        return (await res.json());
    }
    async find(id) {
        const res = await fetch(this.directory + id + '/');
        return (await res.json());
    }
}
