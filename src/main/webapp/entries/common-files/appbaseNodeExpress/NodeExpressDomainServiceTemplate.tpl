import ${entity.name}Repository from '../../infra/repositories/${entity.name}Repository';

class ${entity.name}Service {
    constructor() {
        this.repository = new ${entity.name}Repository();
    }

    async get(id) {
        return this.repository.get(id);
    }

    async listAll(filter) {
        return this.repository.getAll(filter);
    }

    async save(${firstLower(entity.name)}) {
        return this.repository.save(${firstLower(entity.name)});
    }

    async update(id, ${firstLower(entity.name)}) {
        return this.repository.update(id, ${firstLower(entity.name)});
    }

    async delete(id) {
        return this.repository.delete(id);
    }
}

// Generated ${.now}
export default ${entity.name}Service;
