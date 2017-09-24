class Cache {
    constructor() {
        this.objects = {};
    }

    put(object) {
        this.objects[object.id] = object;
    }

    get(id) {
        return this.objects[id];
    }

    clear() {
        this.objects = {};
    }

    cache(objects) {
        this.clear();
        objects.forEach(object => this.put(object));
    }
}

export const notebookCache = new Cache();
export const noteCache = new Cache();
export const taskCache = new Cache();
