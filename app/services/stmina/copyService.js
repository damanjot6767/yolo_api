
const { areasModel, expenseModel } = require(`../../models`);
let copyService = {};

/**
 * function to create new Area to the system.
 * @param {*} payload 
 * @returns 
 */
copyService.create = async (payload) => {
    return await areasModel.create(payload);
};

/**
 * function to fetch Area from the system.
 * @param {*} criteria 
 * @returns 
 */
copyService.get = async (criteria) => {
    return await areasModel.findOne({ where: criteria })
};


/**
 * function to get all users based on criteria.
 */
 copyService.get = async (criteria, attributes = false, limit, offset, sortArray) => {
    let query = {
        where: criteria,
        ...(attributes && { attributes }),
        include: [],
        order: sortArray,
        limit: limit,
        offset: offset
    };
    query['distinct']= true
    return await areasModel.findAndCountAll(query);
};

 copyService.update= async (criteria, dataToUpdate) => {
    return await areasModel.update(dataToUpdate, { where: criteria });
};

/**
 * function to remove Area from system.
 * @param {*} criteria 
 * @returns 
 */
copyService.remove = async (criteria) => {
    return await areasModel.destroy({ where: criteria });
};

copyService.getAreaInclude = async (criteria) => {
    return await areasModel.findAll({
        where: criteria,
        //  attributes: [''] // keys that you need 
        include: [{
            model: expenseModel,
            // attributes: [] //keys that you need
            as: 'AreaExpense'
            }]
        })
};

copyService.getAll = async (payload) => {
    let query = {};
    if(payload?.field && payload?.order){
        const orderBy = [
            [payload.field, payload.order]
        ]
        query['order'] = orderBy 
    }
    if(payload?.page && payload?.pageSize){
        const offset = payload.page == 1 ? (payload.page-1) : ((payload.page-1) * payload.pageSize);
        const limit = payload.pageSize;
        query['offset'] = offset;
        query['limit'] = limit
    }
    query['distinct']= true
    return await areasModel.findAndCountAll(query);
};
module.exports = copyService;