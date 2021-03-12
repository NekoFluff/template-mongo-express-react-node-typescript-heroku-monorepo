import { Instantiable, MongoDBDocument } from "@monorepo/common";

export default interface ICollection<T extends MongoDBDocument> {
  create(items: Array<T>): Promise<any>;
  find<T2 = T>(
    filter: any,
    overrideClassType?: Instantiable<T2>
  ): Promise<Record<string, T2>>;
  aggregate<T2 = T>(
    aggregation: any,
    overrideClassType?: Instantiable<T2>
  ): Promise<Record<string, T2>>;
  update(items: Array<T>): Promise<any>;
  delete(filter: any): Promise<any>;
  dataToObject<T2 = T>(
    rawData: any,
    overrideClassType?: Instantiable<T2>
  ): Record<string, T2>;
}
