const mongoose = require('mongoose');

const username = process.env.MONGO_USERNAME
  ? encodeURIComponent(process.env.MONGO_USERNAME)
  : '';
const password = process.env.MONGO_PASSWORD
  ? encodeURIComponent(process.env.MONGO_PASSWORD)
  : '';

const uri = `mongodb+srv://${username}:${password}@cluster1.9ftfskb.mongodb.net/?retryWrites=true&w=majority`;

// Define an interface for connection
interface Connection {
  isConnected?: number;
}

// Use the interface
const connection: Connection = {};

async function connectDb() {
  if (connection.isConnected) {
    // Use existing database connection
    return;
  }

  // Use new database connection
  const db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected ? "DB Connected" : "DB Connection failed");
};

export default connectDb;
