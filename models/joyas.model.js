import pool from '../db/config.js';
import format from 'pg-format';

export const getJoyasModel = async ({ limits = 10, order_by = 'id_ASC', page = 1 }) => {
    const [campo, direccion] = order_by.split('_');
    const offset = (page - 1) * limits;
    
    const formattedQuery = format(
        'SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s',
        campo,
        direccion,
        limits,
        offset
    );
    
    const { rows } = await pool.query(formattedQuery);
    return rows;
};


export const getJoyasByFilterModel = async ({ precio_min, precio_max, categoria, metal }) => {
    let filtros = [];
    const values = [];

    // Funcion interna para construir los filtros de forma segura
    const agregarFiltro = (campo, comparador, valor) => {
        values.push(valor);
        const { length } = filtros;
        filtros.push(`${campo} ${comparador} $${length + 1}`);
    };

    // Aplicar cada filtro
    if (precio_min) agregarFiltro('precio', '>=', precio_min);
    if (precio_max) agregarFiltro('precio', '<=', precio_max);
    if (categoria) agregarFiltro('categoria', '=', categoria);
    if (metal) agregarFiltro('metal', '=', metal);

    let consulta = 'SELECT * FROM inventario';
    
    // Si se agrego al menos un filtro, añade la clausula WHERE
    if (filtros.length > 0) {
        consulta += ` WHERE ${filtros.join(' AND ')}`;
    }
    
    // Ejecuta la consulta parametrizada y devuelve las filas
    const { rows } = await pool.query(consulta, values);
    return rows;
};