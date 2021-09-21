import { ProductosMemDAO } from './DAOs_productos/memory';
import { ProductosFSDAO } from './DAOs_productos/fs';
import { ProductosAtlasDAO } from './DAOs_productos/mongo';
import { ProductosMySQL } from './DAOs_productos/mysql'

import path from 'path';
export enum TipoPersistencia {
  Memoria = 'MEM',
  FileSystem = 'FS',
  MYSQL = 'MYSQL',
  SQLITE3 = 'SQLITE3',
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
  Firebase = 'FIREBASE',
}

export class NoticiasFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      case TipoPersistencia.FileSystem:
        console.log('RETORNANDO INSTANCIA CLASE FS');
        const filePath = path.resolve(__dirname, './DAOs/products.json');
        console.log(filePath);
        return new ProductosFSDAO(filePath);

      case TipoPersistencia.MongoAtlas:
        console.log('RETORNANDO INSTANCIA CLASE MONGO ATLAS');
        return new ProductosAtlasDAO();

      case TipoPersistencia.LocalMongo:
        console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
        return new ProductosAtlasDAO(true);
       
      case TipoPersistencia.Memoria:
        console.log('RETORNANDO INSTANCIA MEMORIA');
        return new ProductosMemDAO();

      case TipoPersistencia.SQLITE3:
        console.log('RETORNANDO SQLITE3');
        return new ProductosMySQL(true);
      
      case TipoPersistencia.MYSQL:
        console.log('RETORNANDO INSTANCIA MYSQL');
        return new ProductosMySQL(); 

      default:
        console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new ProductosMemDAO();
    }
  }
}
