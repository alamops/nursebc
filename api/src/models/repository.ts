export abstract class Repository<T> {
  abstract findAll(...args: any[]): Promise<T[]>;
  abstract find(...args: any[]): Promise<T[]>;
  abstract findOne(...args: any[]): Promise<T>;
}
