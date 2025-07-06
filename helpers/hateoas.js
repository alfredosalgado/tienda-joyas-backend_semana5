// helpers/hateoas.js
export const prepararHATEOAS = (joyas) => {
    // Calcula el stock total usando reduce
    const stockTotal = joyas.reduce((total, joya) => total + joya.stock, 0);
    const totalJoyas = joyas.length;

    // Mapea los resultados para incluir el enlace HATEOAS
    const results = joyas.map((joya) => {
        return {
            name: joya.nombre,
            href: `/joyas/joya/${joya.id}`,
        };
    });
    
    return {
        totalJoyas,
        stockTotal,
        results,
    };
};