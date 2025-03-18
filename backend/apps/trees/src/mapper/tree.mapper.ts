import { CreateTreeDto } from '@app/contracts/trees/create-tree.dto';
import { GetTreeDto } from '@app/contracts/trees/get-tree.dto';
import { GetTreesDto } from '@app/contracts/trees/get-trees.dto';
import { TreeEntity } from '../domain/tree.entity';

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
