import { CreateNodeDto, GetNodeDto, GetNodesDto } from '@app/contracts';
import { NodeEntity } from '@app/genealogy/core/domain/node.entity';

export class NodeDomainMapper {
  static createDto2Domain(dto: CreateNodeDto): NodeEntity {
    const node = NodeEntity.create({
      name: dto.name,
      firstName: dto.firstName,
      lastName: dto.lastName,
      birthDate: new Date(dto.birthDate),
      deathDate: dto.deathDate ? new Date(dto.deathDate) : undefined,
      gender: dto.gender,
    });
    return node;
  }

  static domain2GetDto(node: NodeEntity): GetNodeDto {
    const dto = new GetNodeDto();
    dto.id = node.id;
    dto.name = node.name;
    dto.firstName = node.firstName;
    dto.lastName = node.lastName;
    dto.birthDate = node.birthDate.toISOString();
    dto.deathDate = node.deathDate ? node.deathDate.toISOString() : undefined;
    dto.gender = node.gender;
    return dto;
  }

  static domain2GetAllDto(nodes: NodeEntity[]): GetNodesDto {
    const dto = new GetNodesDto();
    dto.nodes = [];
    dto.nodes.push(...nodes.map((node) => this.domain2GetDto(node)));
    return dto;
  }
}
