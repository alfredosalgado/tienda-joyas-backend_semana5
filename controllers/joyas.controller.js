
import { getJoyasModel, getJoyasByFilterModel } from '../models/joyas.model.js';
import { prepararHATEOAS } from '../helpers/hateoas.js';

export const getJoyasController = async (req, res) => {
    try {
        const queryStrings = req.query;
        const joyas = await getJoyasModel(queryStrings);
        const hateoas = prepararHATEOAS(joyas);
        res.status(200).json(hateoas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getJoyasByFilterController = async (req, res) => {
    try {
        const queryStrings = req.query;
        const joyas = await getJoyasByFilterModel(queryStrings);
        res.status(200).json(joyas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};