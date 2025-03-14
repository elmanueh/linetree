import { CreateTreeDto } from '@app/contracts/trees/create-tree.dto';
import { GetTreeDto } from '@app/contracts/trees/get-tree.dto';
import { GetTreesDto } from '@app/contracts/trees/get-trees.dto';
import { Tree } from '../schema/tree.schema';

export class TreeMapper {
  static toDomain(dto: CreateTreeDto): Tree {
    const tree = new Tree();
    tree.name = dto.name;

    return tree;
  }

  static toGetDto(tree: Tree): GetTreeDto {
    const dto = new GetTreeDto();
    dto.id = tree._id;
    dto.name = tree.name;
    dto.nodes = tree.nodes;

    return dto;
  }

  static toGetAllDto(trees: Tree[]): GetTreesDto {
    const dto = new GetTreesDto();
    dto.trees.push(...trees.map((tree) => this.toGetDto(tree)));

    return dto;
  }
}
