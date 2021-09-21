import knex, { Knex } from 'knex';
import dbConfig from '../../../../knexfile';
import {
  KnexI,
  newProductI,
  ProductI,
  ProductBaseClass,
  ProductQuery,
  mockDataI,
} from '../products.interface';


export class ProductosMySQL implements ProductBaseClass {
//export class ProductosMySQL {
  private environment: string;
  private connection : Knex;
  private productos: ProductI[] = [];
  private tableName: string = 'productos';

  constructor(local: boolean = false) {
    let mockData : mockDataI[] = [];
    mockData = [
      {
        nombre: "lapiz",
        description: "sirve para escribir",
        codigo: 5555,
        foto: "https://",
        precio: 200,
        stock: 3
      },
      {
        nombre: "cartuchera",
        description: "sirve para escribir",
        codigo: 1223,
        foto: "https://",
        precio: 200,
        stock: 3
      },
      {
        nombre: "birome",
        description: "sirve para escribir",
        codigo: 4555,
        foto: "https://",
        precio: 300,
        stock: 3
      }
    ];
    if (local){
      console.log(local)
      this.environment = 'sqlite3';
    }else {
      console.log(local)
      this.environment = 'mysql';};

    //this.productos = mockData,
    console.log(this.productos)
    console.log(`SETTING ${this.environment} DB`);
    const dbcfg: KnexI = dbConfig;
    const options = dbcfg[this.environment];
    this.connection = knex(options); 
    
    this.connection.schema.hasTable(this.tableName).then((exists) => {
      if (!exists) {
        this.connection.schema
          .createTable(this.tableName, (productosTable) => {
            productosTable.increments('_id');
            productosTable.string('nombre').notNullable();
            productosTable.string('description').notNullable();
            productosTable.string('codigo').notNullable();
            productosTable.decimal('precio', 5, 2).notNullable();
            productosTable.string('foto').notNullable();
            productosTable.timestamp('timestamp').defaultTo(this.connection.fn.now());
            productosTable.integer('stock').notNullable();
          })
          .then(() => {
            console.log('Tabla productos creada');
            this.connection(this.tableName)
              .insert(mockData)
              .then(() => console.log('Productos agregados'))
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      }
    });
  }

  async get(id?: string): Promise<ProductI[]> {
    let output: ProductI[] = [];
    try {
      if (id) {
        return this.connection(this.tableName).where('_id', Number(id));

      } else {
        return this.connection(this.tableName);
      };
    } catch (err) {
      throw { error: err, message: 'Hubo un problema al cargar los productos' };
    }
  }

  async add(data: newProductI): Promise<ProductI> {
    if (!data.nombre || !data.precio) throw new Error('invalid data');

    return this.connection(this.tableName).insert(data);
  }

  async update(id: string, newProductData: newProductI): Promise<ProductI> {
    return this.connection(this.tableName).where('_id', Number(id)).update(newProductData);
  }

  async delete(id: string) : Promise<void> {
    return this.connection(this.tableName).where('_id', Number(id)).del();
  }

  async query(options: ProductQuery): Promise<ProductI[]> {
    let query: ProductQuery = {};

    if (options.nombre) query.nombre = options.nombre;

    if (options.precio) query.precio = options.precio;

    return this.connection(this.tableName).where(query);
  }
}