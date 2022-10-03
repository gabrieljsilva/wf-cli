import { Connection } from 'typeorm';

export abstract class BaseSeeder<Entity> {
  protected constructor(
    protected readonly connection: Connection,
    protected readonly entities: Partial<Entity>[],
  ) {}
  abstract seed(): Promise<void>;
}
