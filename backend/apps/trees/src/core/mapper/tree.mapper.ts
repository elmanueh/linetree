import { CreateTreeDto, GetTreeDto, GetTreesDto } from '@genealogy/contracts';
import { TreeEntity } from '../core/domain/tree.entity';

export class TreeMapper {
  static toDomain(dto: CreateTreeDto): TreeEntity {
    const tree = TreeEntity.create({ name: dto.name });

    return tree;
  }

  static toGetDto(tree: TreeEntity): GetTreeDto {
    const dto = new GetTreeDto();
    dto.id = tree.id;
    dto.name = tree.name;
    dto.nodes = tree.nodes;

    return dto;
  }

  static toGetAllDto(trees: TreeEntity[]): GetTreesDto {
    const dto = new GetTreesDto();
    dto.trees.push(...trees.map((tree) => this.toGetDto(tree)));

    return dto;
  }
}
