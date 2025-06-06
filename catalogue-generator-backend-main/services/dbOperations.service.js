module.exports = {
    getSingleItem: async (model, query, exclude = "") => {
        return await model.findOne(query).select(exclude);
    },

    getMultipleItems: async (model, query, exclude = "", population) => {
        return await model.find(query).populate(population).select(exclude);
    },

    createItem: async (model, query) => {
        return await model.create(query);
    },

    findAndUpdate: async (model, query, update, options = { new: true }) => {
        return await model.findOneAndUpdate(query, update, options);
    },

    findAndDelete: async (model, query) => {
        return await model.findOneAndDelete(query);
    },
};
