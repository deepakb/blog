const resetTestDb = async (connection) => {
    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({ _id: { $ne: null }});
    }
};

module.exports = resetTestDb;
