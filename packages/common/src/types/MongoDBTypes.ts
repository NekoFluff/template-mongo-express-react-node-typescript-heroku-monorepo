export interface Instantiable<T> {
  new (...args: any[]): T;
}

export interface MongoDBDocument {
  _id: string;
}
