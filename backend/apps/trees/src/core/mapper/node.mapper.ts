import { CreateNodeDto, GetNodeDto, GetNodesDto } from '@genealogy/contracts';
import { NodeEntity } from '../core/domain/node.entity';

export class NodeMapper {
  static toDomain(dto: CreateNodeDto): NodeEntity {
    const node = NodeEntity.create({ name: dto.name });
    return node;
  }

  static toGetDto(node: NodeEntity): GetNodeDto {
    const dto = new GetNodeDto();
    return dto;
  }

  static toGetAllDto(nodes: NodeEntity[]): GetNodesDto {
    const dto = new GetNodesDto();
    return dto;
  }
}
