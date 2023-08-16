
const { MongoClient } = require('mongodb');
const { copyCollectionData } = require('./lib/copy-db');
const { SOURCE_URL, SOURCE_DB_NAME, TARGET_URL, TARGET_DB_NAME, COLLECTION_NAMES } = require('./config')



async function main() {
    if (!SOURCE_URL || !TARGET_URL) throw new Error('MONGODB URL NOT PROVIDED!')
    if (!SOURCE_DB_NAME || !TARGET_DB_NAME) throw new Error('DB NAME NOT PROVIDED')

    const sourceClient = new MongoClient(SOURCE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    const targetClient = new MongoClient(TARGET_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await sourceClient.connect();
        await targetClient.connect();

        const sourceDb = sourceClient.db(SOURCE_DB_NAME);
        const targetDb = targetClient.db(TARGET_DB_NAME);

        const collectionNames = COLLECTION_NAMES.split(' ')

        for (const collectionName of collectionNames) {
            const sourceCollection = sourceDb.collection(collectionName);
            const targetCollection = targetDb.collection(collectionName);

            await copyCollectionData(sourceCollection, targetCollection);
        }

        console.log('SUCCESS.');
    } catch (error) {
        console.error('ERROR:', error);
    } finally {
        await sourceClient.close();
        await targetClient.close();
    }
}

main();
