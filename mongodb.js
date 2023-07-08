import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

const dbConnect = async ()=>{
    let result = await client.connect();
    let collection = result.db('store').collection('inventory');
    return collection;
}

export default dbConnect;