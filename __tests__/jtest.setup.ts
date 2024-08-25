import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connect from "../configs/mongoConnection";
import Users from "../src/schemas/user.schema";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  connect(() => console.log("connected to in-memory DB"), uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  const collections = await mongoose.connection.db?.collections();
  if (collections) {
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }

  await createData();
});

const createData = async () => {
  await Users.create({
    username: "a",
    password: "a",
    email: "a@a",
    firstName: "a",
    lastName: "a",
  });
};
