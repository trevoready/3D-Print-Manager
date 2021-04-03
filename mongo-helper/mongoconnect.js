const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = process.env.MONGO_URI;
console.log(process.env)
const client = new MongoClient(url);
//connect and return the connected client
module.exports.getClient = async() => {
    var mongo = await client.connect()
    return mongo.db(process.env.MONGO_DB)
};