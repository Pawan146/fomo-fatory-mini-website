// pages/api/updateData.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import fetch from 'node-fetch';

const uri = "mongodb://localhost:27017";
const databaseName = 'cryptoData'; // Replace with your database name
const collectionName = 'prices'; // Replace with your collection name

const client = new MongoClient(uri);

async function fetchData() {
  const symbols = ['bitcoin', 'ethereum', 'ripple', 'litecoin', 'cardano']; // Example cryptocurrencies
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${symbols.join(',')}&vs_currencies=usd`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function storeData(data: any) {
  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    const operations = Object.keys(data).map((key) => ({
      updateOne: {
        filter: { id: key },
        update: { $set: { price: data[key].usd, lastUpdated: new Date() } },
        upsert: true,
      },
    }));

    await collection.bulkWrite(operations);
  } finally {
    await client.close();
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await fetchData();
  await storeData(data);
  res.status(200).json({ message: 'Data updated successfully' });
}

async function pollData() {
    try {
      const data = await fetchData();
      console.log('Data fetched:', data);
      await storeData(data);
    } catch (error) {
      console.error('Error during data fetch or storage:', error);
    }
  }
  
  // Start polling every 10 seconds (10000 milliseconds)
  setInterval(pollData, 5000);