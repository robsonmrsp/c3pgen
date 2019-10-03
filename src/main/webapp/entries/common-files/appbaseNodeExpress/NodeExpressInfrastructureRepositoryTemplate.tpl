
import ${entity.name}Model from '../database/models/${entity.name}Model';

class ${entity.name}Repository {
    get = async (id) => {
        const ${firstLower(entity.name)} = await ${entity.name}Model.findByPk(id);
        return ${firstLower(entity.name)};
    }

    getAll = async (filter) => {
        const ${firstLower(entity.name)}s = await ${entity.name}Model.findAll(filter);
        return ${firstLower(entity.name)}s;
    }

    save = async (${firstLower(entity.name)}) => {
        const saved${entity.name} = await ${entity.name}Model.create(${firstLower(entity.name)});
        return saved${entity.name};
    }

    update = async (id, ${firstLower(entity.name)}) => {
        await ${entity.name}Model.update(${firstLower(entity.name)}, { where: { id } });
        return this.get(id);
    }

    delete = async (id) => {
        const ${firstLower(entity.name)} = await ${entity.name}Model.findByPk(id);
        if (!${firstLower(entity.name)}) return false;
        return ${firstLower(entity.name)}.destroy({ force: true });
    }
}

// Generated ${.now}
export default ${entity.name}Repository;
