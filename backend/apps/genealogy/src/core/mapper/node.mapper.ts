import { CreateNodeDto, GetNodeDto, GetNodesDto } from '@genealogy/contracts';
import { NodeEntity } from '@genealogy/core/domain/node.entity';

export class NodeDomainMapper {
  static createDto2Domain(dto: CreateNodeDto): NodeEntity {
    const node = NodeEntity.create({ name: dto.name });
    return node;
  }

  static domain2GetDto(node: NodeEntity): GetNodeDto {
    const dto = new GetNodeDto();
    return dto;
  }

  static domain2GetAllDto(nodes: NodeEntity[]): GetNodesDto {
    const dto = new GetNodesDto();
    return dto;
  }
}
