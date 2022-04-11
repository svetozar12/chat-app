import * as mongoose from "mongoose";
/* Change connection string to "mongodb://mongo:27017/chatAppDb" if you are building docker file and to
"mongodb://localhost:27017/chatAppDb" if you are just running yarn dev*/
const connection = `mongodb://localhost:27017/${process.env.DB_NAME}`;
// const connection = `mongodb://mongo:27017/${process.env.DB_NAME}`;

const mongo_connection = () => {
  return mongoose.connect(
    connection,
    {
      autoIndex: true,
    },
    () => {
      console.log("Connection with mongo");
    },
  );
};
export default mongo_connection;
