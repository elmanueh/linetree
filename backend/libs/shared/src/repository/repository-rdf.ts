import {
  Mapper,
  Repository,
  RepositoryException,
  SparqlService,
  TripleRdf,
} from '@app/shared';
import { UUID } from 'crypto';

export class RepositoryRDF<T> implements Repository<T> {
  constructor(
    private readonly mapper: Mapper<T, TripleRdf>,
    protected readonly sparqlService: SparqlService,
  ) {}

  async save(entity: T): Promise<void> {
    try {
      const triple = this.mapper.domain2Persistance(entity);
      await this.sparqlService.insert(triple);
    } catch (error) {
      console.error('Error al guardar la entidad:', error);
      throw new RepositoryException('The entity could not be created');
    }
  }

  async delete(id: UUID): Promise<void> {
    try {
      const triple = this.mapper.domain2Persistance({ id } as T);
      await this.sparqlService.delete(triple);
    } catch {
      throw new RepositoryException('The entity could not be deleted');
    }
  }

  async findById(id: UUID): Promise<T> {
    throw new Error('Method not implemented.');
    // const subject = `<http://example.org/resource/${id}>`;
    // const query = `
    //   SELECT ?p ?o WHERE {
    //     ${subject} ?p ?o .
    //   }
    // `;
    // const result = await this.sparqlService.query(query);
    // const bindings = result?.results?.bindings;
    //
    // if (!bindings || bindings.length === 0) {
    //   throw new Error(`No se encontró la entidad con ID ${id}`);
    // }
    //
    // // Asumimos que el primer resultado representa la entidad completa.
    // const triple = new Triple(
    //   subject,
    //   `<${bindings[0].p.value}>`,
    //   `<${bindings[0].o.value}>`,
    // );
    //
    // return this.mapper.persistance2Domain(triple);
  }

  async findAll(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
}
