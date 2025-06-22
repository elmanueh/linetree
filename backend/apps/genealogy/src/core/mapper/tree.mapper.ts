import { GetTreeDto, GetTreesDto } from '@app/contracts';
import { TreeEntity } from '@genealogy-ms/core/domain/tree.entity';

export class TreeDomainMapper {
  static domain2GetDto(tree: TreeEntity): GetTreeDto {
    const dto = new GetTreeDto();
    dto.id = tree.id;
    dto.name = tree.name;
    dto.nodes = tree.nodes.map((node) => node.id);
    dto.createdAt = tree.createdAt!;
    dto.updatedAt = tree.updatedAt!;
    return dto;
  }

  static domain2GetAllDto(trees: TreeEntity[]): GetTreesDto {
    const dto = new GetTreesDto();
    dto.trees = [];
    dto.trees.push(...trees.map((tree) => this.domain2GetDto(tree)));
    return dto;
  }
}
