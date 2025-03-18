import { UUID } from 'crypto';
import { HydratedDocument, Model } from 'mongoose';
import { EntityNotFoundException } from './exceptions/entity-not-found.exception';
import { RepositoryException } from './exceptions/repository.exception';
import { Mapper } from './mapper/mapper';
import { Repository } from './repository';

export class RepositoryMongoose<T, K> extends Repository<T> {
  constructor(
    private readonly model: Model<HydratedDocument<K>>,
    private readonly mapper: Mapper<T, K>,
  ) {
    super();
  }

  async save(entity: T): Promise<void> {
    try {
      const document = new this.model(this.mapper.toPersistance(entity));
      await document.save();
    } catch {
      throw new RepositoryException('The entity could not be created');
    }
  }

  async delete(id: UUID): Promise<void> {
    try {
      const document = await this.model.findById(id);
      if (!document) {
        throw new EntityNotFoundException(`Entity with id "${id}" not found`);
      }
      await this.model.findByIdAndDelete(id);
    } catch (error) {
      if (error instanceof EntityNotFoundException) throw error;
      throw new RepositoryException('The entity could not be deleted');
    }
  }

  async findById(id: UUID): Promise<T> {
    try {
      const document = await this.model.findById(id);
      if (!document) {
        throw new EntityNotFoundException(`Entity with id "${id}" not found`);
      }
      return this.mapper.toDomain(document);
    } catch (error) {
      if (error instanceof EntityNotFoundException) throw error;
      throw new RepositoryException('The entity could not be found');
    }
  }

  async findAll(): Promise<T[]> {
    try {
      const documents = await this.model.find();
      return documents.map((document) => this.mapper.toDomain(document));
    } catch {
      throw new RepositoryException('The entities could not be found');
    }
  }
}
