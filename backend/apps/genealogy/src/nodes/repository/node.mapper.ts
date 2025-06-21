import { Mapper } from '@app/shared';
import { GenderType } from '@genealogy-ms/core/domain/gender.enum';
import { NodeEntity } from '@genealogy-ms/core/domain/node.entity';
import { Node } from '@genealogy-ms/nodes/repository/node.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NodePersistanceMapper implements Mapper<NodeEntity, Node> {
  domain2Persistance(entity: NodeEntity): Node {
    return {
      _id: entity.id,
      address: entity.address,
      birthDate: entity.birthDate,
      birthPlace: entity.birthPlace,
      deathDate: entity.deathDate,
      deathPlace: entity.deathPlace,
      email: entity.email,
      familyName: entity.familyName,
      gender: entity.gender,
      givenName: entity.givenName,
      nationality: entity.nationality,
      telephone: entity.telephone,
    };
  }

  persistance2Domain(document: Node): Promise<NodeEntity> {
    return Promise.resolve(
      NodeEntity.create(
        {
          address: document.address,
          birthDate: document.birthDate,
          birthPlace: document.birthPlace,
          deathDate: document.deathDate,
          deathPlace: document.deathPlace,
          email: document.email,
          familyName: document.familyName,
          gender: document.gender as GenderType,
          givenName: document.givenName,
          nationality: document.nationality,
          telephone: document.telephone,
        },
        document._id,
      ),
    );
  }
}
