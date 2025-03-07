import { MongoClient } from 'mongodb';
import { MONGO_URL } from '../../config.ts';

if (!MONGO_URL) {
    throw new Error("Error required Mongodb");
}

const client = new MongoClient(MONGO_URL);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('akeno-manage');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        throw error;
    }
}

export async function DbStartInBot(user_id: number): Promise<void> {
    if (!user_id) return;
    const db = await connectToDatabase();
    const collection = db.collection("startbot");
    await collection.updateOne(
        { user_id },
        { $set: { started_at: new Date() } },
        { upsert: true }
    );
}

export { connectToDatabase, client };
