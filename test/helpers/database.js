const resetTestDb = async (connection) => {
    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.remove()
    }
};

module.exports = { resetTestDb };
