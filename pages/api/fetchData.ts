import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = "mongodb://localhost:27017";
const databaseName = 'cryptoData';
const collectionName = 'prices';

const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol } = req.query; // Expecting a query parameter 'symbol' to specify the stock/crypto

  try {
    await client.connect();
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    const data = await collection.find({ id: symbol })
                                 .sort({ lastUpdated: -1 })
                                 .limit(20)
                                 .toArray();

    res.status(200).json(data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  } finally {
    await client.close();
  }
}