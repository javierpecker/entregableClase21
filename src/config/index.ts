import dotenv from 'dotenv';
dotenv.config();

const venv = {
  PORT: process.env.PORT || 8080,
  MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || 'user',
  MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || 'pasw',
  MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'clusterUrl',
  MONGO_ATLAS_DBNAME: process.env.MONGO_ATLAS_DBNAME || 'dbName',
  MONGO_LOCAL_DBNAME: process.env.MONGO_LOCAL_DBNAME || 'ecommerce',
  SQLITE3_DBNAME: process.env.SQLITE3_DBNAME || 'ecommerce',
  MYSQL_DBNAME: process.env.MYSQL_DBNAME || 'ecommerce',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'pasw'
};

export default venv;
