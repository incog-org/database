export default class Database {
    controller;
    constructor(controller) {
        this.controller = controller;
    }
    findTheatre(query, offset = 0, limit = 0) {
        return this.controller.findTheatre(query, offset, limit);
    }
    insertTheatre(query) {
        return this.controller.insertTheatre(query);
    }
    createTheatreId() {
        return this.controller.createTheatreId();
    }
    findHost(host, owner) {
        return this.controller.findHost(host, owner);
    }
    insertHost(host, owner) {
        return this.controller.insertHost(host, owner);
    }
    deleteHost(host, owner) {
        return this.controller.deleteHost(host, owner);
    }
}
