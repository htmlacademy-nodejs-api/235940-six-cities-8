export const getMongoURI = (
  {
    username,
    password,
    host,
    port,
    databaseName,
  }:
  {
    username: string,
    password: string,
    host: string,
    port: string,
    databaseName: string,
  }
): string => `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
