import { TripleRdf } from '@app/shared';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SparqlService {
  private readonly endpoint = 'http://localhost:7200/repositories/genealogy';
  constructor(private readonly httpService: HttpService) {}

  async insert(triple: TripleRdf): Promise<void> {
    const query = `
      PREFIX gr: <http://example.org/genealogy#>
      INSERT DATA {
        GRAPH <http://example.org/tree/${triple.context}> {
          gr:${triple.subject} gr:${triple.predicate} gr:${triple.object} .
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
        DROP GRAPH <http://example.org/tree/${triple.context}>
      `;
    } else {
      query = `
        PREFIX gr: <http://example.org/genealogy#>  
        DELETE {
          ?s ?p gr:${triple.object} .
          gr:${triple.subject} ?p ?o .
        }
        WHERE {
          { ?s ?p gr:${triple.object} }
          UNION
          { gr:${triple.subject} ?p ?o }
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

  async query(triple: TripleRdf): Promise<TripleRdf[]> {
    throw new Error('Not implemented');

    // const response = await firstValueFrom(
    //   this.httpService.post(this.endpoint, sparql, {
    //     headers: {
    //       'Content-Type': 'application/sparql-query',
    //       Accept: 'application/sparql-results+json',
    //     },
    //   }),
    // );
    // return response.data?.results?.bindings;
  }
}
