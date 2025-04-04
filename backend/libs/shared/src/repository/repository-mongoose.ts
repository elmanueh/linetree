import {
  EntityNotFoundException,
  Mapper,
  Repository,
  RepositoryException,
} from '@app/shared';
import { UUID } from 'crypto';
import { HydratedDocument, Model } from 'mongoose';

export class RepositoryMongoose<T, K> implements Repository<T> {
  constructor(
    private readonly model: Model<HydratedDocument<K>>,
    private readonly mapper: Mapper<T, K>,
  ) {}

  async save(entity: T): Promise<void> {
    try {
      const document = new this.model(this.mapper.domain2Persistance(entity));
      if (await this.model.findById(document._id)) {
        document.isNew = false;
      }
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
      return this.mapper.persistance2Domain(document);
    } catch (error) {
      if (error instanceof EntityNotFoundException) throw error;
      throw new RepositoryException('The entity could not be found');
    }
  }

  async findAll(): Promise<T[]> {
    try {
      const documents = await this.model.find();
      return documents.map((document) =>
        this.mapper.persistance2Domain(document),
      );
    } catch {
      throw new RepositoryException('The entities could not be found');
    }
  }
}
