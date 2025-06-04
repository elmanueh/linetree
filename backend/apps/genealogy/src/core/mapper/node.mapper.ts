import { CreateNodeDto, GetNodeDto, GetNodesDto } from '@app/contracts';
import { NodeEntity } from '@app/genealogy/core/domain/node.entity';

export class NodeDomainMapper {
  static createDto2Domain(dto: CreateNodeDto): NodeEntity {
    const node = NodeEntity.create({
      givenName: dto.givenName,
      gender: dto.gender,
    });

    if (dto.address) node.address = dto.address;
    if (dto.birthDate) node.birthDate = dto.birthDate;
    if (dto.birthPlace) node.birthPlace = dto.birthPlace;
    if (dto.deathDate) node.deathDate = dto.deathDate;
    if (dto.deathPlace) node.deathPlace = dto.deathPlace;
    if (dto.email) node.email = dto.email;
    if (dto.familyName) node.familyName = dto.familyName;
    if (dto.gender) node.gender = dto.gender;
    if (dto.nationality) node.nationality = dto.nationality;
    if (dto.telephone) node.telephone = dto.telephone;

    return node;
  }

  static domain2GetDto(node: NodeEntity): GetNodeDto {
    const dto = new GetNodeDto();
    dto.id = node.id;
    dto.address = node.address;
    dto.birthDate = node.birthDate;
    dto.birthPlace = node.birthPlace;
    dto.deathDate = node.deathDate;
    dto.deathPlace = node.deathPlace;
    dto.email = node.email;
    dto.familyName = node.familyName;
    dto.gender = node.gender;
    dto.givenName = node.givenName;
    dto.nationality = node.nationality;
    dto.telephone = node.telephone;

    return dto;
  }

  static domain2GetAllDto(nodes: NodeEntity[]): GetNodesDto {
    const dto = new GetNodesDto();
    dto.nodes = [];
    dto.nodes.push(...nodes.map((node) => this.domain2GetDto(node)));
    return dto;
  }
}
