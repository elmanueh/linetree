import { Gender } from '@app/genealogy/core/domain/gender.enum';
import { NodeEntity } from '@app/genealogy/core/domain/node.entity';
import { Node } from '@app/genealogy/nodes/repository/node.schema';
import { Mapper } from '@app/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NodePersistanceMapper implements Mapper<NodeEntity, Node> {
  domain2Persistance(entity: NodeEntity): Node {
    return {
      _id: entity.id,
      name: entity.name,
      firstName: entity.firstName,
      lastName: entity.lastName,
      birthDate: entity.birthDate,
      deathDate: entity.deathDate ? entity.deathDate : undefined,
      gender: entity.gender,
    };
  }

  persistance2Domain(document: Node): NodeEntity {
    return NodeEntity.create(
      {
        name: document.name,
        firstName: document.firstName,
        lastName: document.lastName,
        birthDate: document.birthDate,
        deathDate: document.deathDate,
        gender: document.gender as Gender,
      },
      document._id,
    );
  }
}
