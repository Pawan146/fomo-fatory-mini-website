// pages/api/updateData.js
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
const databaseName = 'cryptoData'; // Replace with your database name
const collectionName = 'prices'; // Replace with your collection name

const client = new MongoClient(uri);

async function fetchData() {
    const { default: fetch } = await import('node-fetch');
    const symbols = ['bitcoin', 'ethereum', 'ripple', 'litecoin', 'cardano']; // Example cryptocurrencies
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${symbols.join(',')}&vs_currencies=usd`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function storeData(data) {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    const operations = Object.keys(data).map((key) => ({
      insertOne: {
        document: {
          id: key,
          price: data[key].usd,
          timestamp: new Date()
        }
      }
    }));

    await collection.bulkWrite(operations);
  } finally {
    await client.close();
  }
}

async function handler() {
    try {
        const data = await fetchData();
        await storeData(data);
        //console.log('Data updated successfully');
      } catch (error) {
        console.error(error);
        console.log('Failed to fetch the data and store it in the database');
      }
}

module.exports = handler;