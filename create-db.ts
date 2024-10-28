import 'dotenv/config';
import { DataSource } from 'typeorm';

export async function createDatabase() {
  const dataSource = new DataSource({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'mysql',
  });

  try {
    await dataSource.initialize();
    const dbName =
      process.env.NODE_ENV === 'test'
        ? 'challenger-test'
        : (process.env.DB_DATABASE as string);

    // Verifica se o banco de dados já existe
    const dbExists = await dataSource.query(`
      SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${dbName}'
    `);

    // Se o banco de dados não existir, cria
    if (dbExists.length === 0) {
      await dataSource.query(`CREATE DATABASE \`${dbName}\``);
      console.log(`Banco de dados '${dbName}' criado com sucesso.`);
    } else {
      console.log(`Banco de dados '${dbName}' já existe.`);
    }
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  } finally {
    await dataSource.destroy();
  }
}

createDatabase();
