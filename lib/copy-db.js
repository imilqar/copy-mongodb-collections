const { MongoClient } = require('mongodb');

async function copyCollectionData(sourceCollection, targetCollection) {
    try {
        const documents = await sourceCollection.find({}).toArray();
        await targetCollection.insertMany(documents);

        console.log(`'${sourceCollection.collectionName}' koleksiyonu kopyalandı. Toplam döküman sayısı: ${documents.length}`);
    } catch (error) {
        console.error(`'${sourceCollection.collectionName}' koleksiyonunu kopyalarken bir hata oluştu:`, error);
    }
}

exports.copyCollectionData = copyCollectionData

async function copyDocumentWithSameId(sourceCollection, targetCollection, document) {
    const originalObjectId = document._id;

    const copiedDocument = { ...document, _id: originalObjectId };

    await targetCollection.insertOne(copiedDocument);
}

exports.copyDocumentWithSameId = copyDocumentWithSameId