import express from 'express';
import ${entity.name}Service from '../../../domain/${firstLower(entity.name)}/${entity.name}Service';

const ${entity.name}Controller = express.Router();

const ${firstLower(entity.name)}Service = new ${entity.name}Service();

${entity.name}Controller.get('/:id', async (req, res) => {
    const { id } = req.params;
    const ${firstLower(entity.name)} = await ${firstLower(entity.name)}Service.get(id);
    return res.send(${firstLower(entity.name)});
});

${entity.name}Controller.get('/', async (req, res) => {
    const filter${entity.name} = { name: req.body };
    const ${firstLower(entity.name)}s = await ${firstLower(entity.name)}Service.listAll(filter${entity.name});
    return res.send(${firstLower(entity.name)}s);
});

${entity.name}Controller.post('/', async (req, res) => {
    const ${firstLower(entity.name)} = { title: req.body.title, sinopse: req.body.sinopse, releaseDate: req.body.releaseDate };

    const saved${entity.name} = await ${firstLower(entity.name)}Service.save(${firstLower(entity.name)});

    return res.status(201).send(saved${entity.name});
});

${entity.name}Controller.put('/:id', async (req, res) => {
    const { id } = req.params;
    const ${firstLower(entity.name)} = { title: req.body.title, sinopse: req.body.sinopse, releaseDate: req.body.releaseDate };

    const saved${entity.name} = await ${firstLower(entity.name)}Service.update(id, ${firstLower(entity.name)});

    return res.status(200).send(saved${entity.name});
});

${entity.name}Controller.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await ${firstLower(entity.name)}Service.delete(id);
    return res.status(200).send();
});

// Generated ${.now}
export default ${entity.name}Controller;
