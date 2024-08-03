import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

// Define the shape of your data for TypeScript
interface DataType {
    message: string;
    data?: any;
    error?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<DataType>
) {
    try {
        const { db } = await clientPromise;
        const data = await db.collection('your_collection_name').find({}).toArray();
        res.status(200).json({ message: 'Data fetched successfully', data });
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ message: 'Error fetching data', error: e.message });
        } else {
            // Handle cases where the error is not an instance of Error
            res.status(500).json({ message: 'Error fetching data', error: 'An unknown error occurred' });
        }
    }
}