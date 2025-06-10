import { TripleRdf } from '@app/shared';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { NodeObject } from 'jsonld';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SparqlService {
  private readonly endpoint = 'http://localhost:7200/repositories/genealogy';
  private readonly contextUri = 'http://example.org/graph/';
  private readonly nodeUri = 'http://example.org/node/';

  constructor(private readonly httpService: HttpService) {}

  async insert(triple: TripleRdf): Promise<void> {
    const query = `
      PREFIX schema: <http://schema.org/>
      INSERT DATA {
        GRAPH <${this.contextUri}${triple.context}> {
          <${this.nodeUri}${triple.subject}> schema:${triple.predicate} <${this.nodeUri}${triple.object}> .
        } 
      }`;

    await firstValueFrom(
      this.httpService.post(`${this.endpoint}/statements`, query, {
        headers: {
          'Content-Type': 'application/sparql-update',
        },
      }),
    );
  }

  async delete(triple: TripleRdf): Promise<void> {
    let query = '';
    if (triple.context) {
      query = `
        DROP GRAPH <${this.contextUri}${triple.context}>
      `;
    } else {
      query = `
        DELETE {
          ?s ?p <${this.nodeUri}${triple.object}> .
          <${this.nodeUri}${triple.subject}> ?p ?o .
        }
        WHERE {
          { ?s ?p <${this.nodeUri}${triple.object}> }
          UNION
          { <${this.nodeUri}${triple.subject}> ?p ?o }
        }`;
    }

    await firstValueFrom(
      this.httpService.post(`${this.endpoint}/statements`, query, {
        headers: {
          'Content-Type': 'application/sparql-update',
        },
      }),
    );
  }

  private getQuery(triple: TripleRdf): string {
    const { subject, predicate, object, context } = triple;
    const graphClause = context ? `GRAPH <${this.contextUri}${context}>` : '';
    const subjectPart = subject ? `<${this.nodeUri}${subject}>` : '?subject';
    const predicatePart = predicate ? `schema:${predicate}` : '?predicate';
    const objectPart = object ? `<${this.nodeUri}${object}>` : '?object';

    return `
      PREFIX schema: <http://schema.org/>
      SELECT ?subject ?predicate ?object
      WHERE {
        ${graphClause ? `${graphClause} {` : ''}
          ${subjectPart} ${predicatePart} ${objectPart} .
        ${graphClause ? '}' : ''}
      }
    `;
  }

  async query(triple: TripleRdf): Promise<TripleRdf[]> {
    const sparqlQuery = this.getQuery(triple);

    const response = await firstValueFrom(
      this.httpService.post(this.endpoint, sparqlQuery, {
        headers: {
          'Content-Type': 'application/sparql-query',
          Accept: 'application/sparql-results+json',
        },
      }),
    );

    return response.data?.results?.bindings.map((binding: any) => ({
      subject: binding.subject?.value,
      predicate: binding.predicate?.value,
      object: binding.object?.value,
      context: triple.context,
    }));
  }

  async construct(triple: TripleRdf): Promise<NodeObject[]> {
    const query = `
      PREFIX schema: <http://schema.org/>

      CONSTRUCT {
        ?person a schema:Person .
        ?spouse a schema:Person .
        ?child a schema:Person .
        ?person schema:spouse ?spouse .
        ?person schema:children ?child .
      }
      WHERE {
        GRAPH <${this.contextUri}${triple.context}> {
          { ?person schema:children ?child . }
          UNION
          { ?child schema:parent ?person . }
          UNION
          { ?person schema:spouse ?spouse . }
        }
      }`;

    const response = await firstValueFrom(
      this.httpService.post<NodeObject[]>(this.endpoint, query, {
        headers: {
          'Content-Type': 'application/sparql-query',
          Accept: 'application/ld+json',
        },
      }),
    );

    return response.data;
  }

  async queryDescendants(triple: TripleRdf): Promise<TripleRdf[]> {
    const query = `
      PREFIX schema: <http://schema.org/>
      SELECT ?subject ?predicate ?object
      WHERE {
        GRAPH <${this.contextUri}${triple.context}> {
          BIND(<${this.nodeUri}${triple.subject}> AS ?subject)
          {
            ?subject schema:children+ ?object
          } UNION {
            ?subject schema:children+ ?a .
            ?a schema:spouse ?object
          } UNION {
            ?subject schema:spouse ?object
          }
        }
      }`;

    const response = await firstValueFrom(
      this.httpService.post(this.endpoint, query, {
        headers: {
          'Content-Type': 'application/sparql-query',
          Accept: 'application/sparql-results+json',
        },
      }),
    );

    return response.data?.results?.bindings.map((binding: any) => ({
      subject: binding.subject?.value,
      predicate: binding.predicate?.value,
      object: binding.object?.value,
      context: triple.context,
    }));
  }

  async queryParents(triple: TripleRdf): Promise<TripleRdf[]> {
    const query = `
      PREFIX schema: <http://schema.org/>
      SELECT ?subject ?predicate ?object
      WHERE {
        GRAPH <${this.contextUri}${triple.context}> {
          BIND(<${this.nodeUri}${triple.subject}> AS ?subject)
          ?subject schema:parent ?object .
          BIND(schema:parent AS ?predicate)
        }
      }`;

    const response = await firstValueFrom(
      this.httpService.post(this.endpoint, query, {
        headers: {
          'Content-Type': 'application/sparql-query',
          Accept: 'application/sparql-results+json',
        },
      }),
    );

    return response.data?.results?.bindings.map((binding: any) => ({
      subject: binding.subject?.value,
      predicate: binding.predicate?.value,
      object: binding.object?.value,
      context: triple.context,
    }));
  }
}
