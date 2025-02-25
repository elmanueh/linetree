import { CreateTreeDto } from '../dto/create-tree.dto';
import { GetTreeDto } from '../dto/get-tree.dto';
import { GetTreesDto } from '../dto/get-trees.dto';
import { Tree } from '../schema/tree.schema';

export class TreeMapper {
  static toDomain(dto: CreateTreeDto): Tree {
    const tree = new Tree();
    tree.name = dto.name;

    return tree;
  }

  static toGetDto(tree: Tree): GetTreeDto {
    const dto = new GetTreeDto();
    dto.id = tree.id;
    dto.name = tree.name;

    return dto;
  }

  static toGetAllDto(trees: Tree[]): GetTreesDto {
    const dto = new GetTreesDto();
    dto.trees.push(...trees.map((tree) => this.toGetDto(tree)));

    return dto;
  }
}
