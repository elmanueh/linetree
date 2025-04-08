import { Mapper, Repository } from '@app/shared';
import { UUID } from 'crypto';
import { Model } from 'mongoose';

export class RepositoryRDF<T, K> implements Repository<T> {
  constructor(
    private readonly model: Model<K>,
    private readonly mapper: Mapper<T, K>,
  ) {}

  async save(entity: T): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(id: UUID): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findById(id: UUID): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
}
